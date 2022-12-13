const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");

async function main() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);

  const LPTokensUser = await protocolContract.getLPTokensOfUser(my_address);
  console.log(`LP Tokens User: ${LPTokensUser.toString()}`);

  const LPTokensSender = await protocolContract.getLPTokensOfSender();
  console.log(`LP Tokens Msg.Sender: ${LPTokensSender.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
