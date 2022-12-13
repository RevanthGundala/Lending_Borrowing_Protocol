const { ethers } = require("hardhat");
const { protocolAddress } = require("../constants/index");

async function main() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);

  const balance = await protocolContract.getTotalValueLocked();
  console.log(`Balance: ${ethers.utils.formatEther(balance.toString())}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
