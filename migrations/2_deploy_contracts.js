const CrowdBank = artifacts.require("CrowdBank.sol");
const Mortgage = artifacts.require("Mortgage.sol");
module.exports = function(deployer) {
  deployer.deploy(CrowdBank);
  deployer.deploy(Mortgage);
};
