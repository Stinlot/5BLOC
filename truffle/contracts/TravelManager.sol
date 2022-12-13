// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TravelManager {


struct Travel {
    uint256 id;
    string  departureCity;
    string  arrivalCity;
    uint16  discountedPrice;
    uint16  realPrice;
    address owner;
    string departureDate;  
  }

  address private admin;
  Travel[] travelArray;
  
  constructor(address _admin){
    admin = _admin;
  }

  function isAdmin(address user) public view returns (bool){
      return user == admin;
  }

  function bookNewTravel(string memory _departureCity,string memory _arrivalCity,uint16 _discountedPrice,uint16 _realPrice,address buyer, string memory _departureDate) public {
      uint256 generatedId = getUnusedId();
      Travel memory travel = Travel(generatedId,_departureCity,_arrivalCity,_discountedPrice,_realPrice,buyer, _departureDate);
      travelArray.push(travel);
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
    for(uint i = 0;i<travelArray.length;i++){
      if(travelArray[i].id == _id){
        isUsed = true;
      }
    }
    
    return isUsed;
  }

  function getTravelsByOwner(address owner) public view returns (Travel[] memory) {
    uint size = 0;
    for(uint i = 0;i<travelArray.length;i++){
      if(travelArray[i].owner == owner){
        size++;
      }
    }

    Travel[] memory array = new Travel[](size);
    uint temp = 0;
    for(uint i = 0;i<travelArray.length;i++){
      if(travelArray[i].owner == owner){
        array[temp] = travelArray[i];
        temp++;
      }
    }

    return array;

  }

  function getTravelById(uint cardId) private view returns (Travel memory){
    for(uint i = 0;i<travelArray.length;i++){
      if(travelArray[i].id == cardId){
        return travelArray[i]; 
      }
    }
  }

  
  function getTravels() public view returns (Travel[] memory) {
    return travelArray;
  }
}

