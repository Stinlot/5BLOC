// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "./PrivilegeCard.sol";

contract PrivilegeCardManager {

enum STATUS {OWNED, SELLING }

struct PrivilegeCard {
    uint256 id;
    string  name;
    uint256  price;
    uint16  discountPercentage;
    address owner;
    STATUS status;
  }

  address private admin;
  PrivilegeCard[] privilegeCardArray;
  
  constructor(address _admin){
    admin = _admin;
  }

  function isAdmin(address user) public view returns (bool){
      return user == admin;
  }

  function createNewPrivilegeCard(string memory _name,uint _price,uint16 _discountPercentage) public {
      uint256 generatedId = getUnusedId();
      PrivilegeCard memory privilegeCard = PrivilegeCard(generatedId,_name,_price,_discountPercentage,address(0),STATUS.SELLING);
      privilegeCardArray.push(privilegeCard);
  }


  function getUnusedId() private view returns (uint256){
    for(uint i = 0; i<65536;i++){
      if(!doesArrayContainsId(i)){
          return i;
      }
    }
    revert("Couldn't find any unused id");
  }

  function doesArrayContainsId(uint256 _id) private view returns (bool){
    bool isUsed = false;
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].id == _id){
        isUsed = true;
      }
    }
    
    return isUsed;
  }

  function getCardsByOwner(address owner) public view returns (PrivilegeCard[] memory) {
    uint size = 0;
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].owner == owner){
        size++;
      }
    }

    PrivilegeCard[] memory array = new PrivilegeCard[](size);
    uint temp = 0;
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].owner == owner){
        array[temp] = privilegeCardArray[i];
        temp++;
      }
    }

    return array;

  }


  function getFreeCards() public view returns (PrivilegeCard[] memory) {
    uint size = 0;
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].status == STATUS.SELLING){
        size++;
      }
    }

    PrivilegeCard[] memory array = new PrivilegeCard[](size);
    uint temp = 0;
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].status == STATUS.SELLING){
        array[temp] = privilegeCardArray[i];
        temp++;
      }
    }

    return array;

  }

  function getCardById(uint cardId) private view returns (PrivilegeCard memory){
    for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].id == cardId){
        return privilegeCardArray[i]; 
      }
    }
  }

  function buyCard(uint cardId, address buyer) public {
      PrivilegeCard memory chosenCard = getCardById(cardId);
      require(chosenCard.status == STATUS.SELLING,"This card is not for sale.");
      //require(buyer.balance < chosenCard.price,"The buyer doesn't have enough money to buy");

      //transaction :(

      chosenCard.owner = buyer;
      chosenCard.status = STATUS.OWNED;

      for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].id == cardId){
        privilegeCardArray[i] = chosenCard;
      }
    }

  }

  function sellCard(uint cardId, address seller) public {
      PrivilegeCard memory chosenCard = getCardById(cardId);
      //require(chosenCard.status == STATUS.SELLING,"This card is already for sale.");
      //require(chosenCard.owner != seller,"This is not your card.");

  
      chosenCard.status = STATUS.SELLING;

      for(uint i = 0;i<privilegeCardArray.length;i++){
      if(privilegeCardArray[i].id == cardId){
        privilegeCardArray[i] = chosenCard;
      }
    }

  }


  function getPrivilegeCardArray() public view returns (PrivilegeCard[] memory) {
    return privilegeCardArray;
  }


 
  
}

