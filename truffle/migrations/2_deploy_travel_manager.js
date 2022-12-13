const PrivilegeCardManager = artifacts.require("PrivilegeCardManager");
var admin = "0x516f4dCD36093187523502263aC96A2c4263AB29";

module.exports = function (deployer) {
  deployer.deploy(PrivilegeCardManager,admin);
};
