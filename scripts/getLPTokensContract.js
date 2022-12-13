const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");

async function main() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);

  const LPTokens = await protocolContract.getLPTokensInContract();
  console.log(`LP Tokens: ${LPTokens.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
