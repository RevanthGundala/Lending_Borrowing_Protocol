const { ethers } = require("hardhat");
const { protocolAddress } = require("../constants/index");

async function main() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);
  const balance = await protocolContract.getAllowance();
  console.log(`Allowance: ${balance.toString()}`);
  const tx = await protocolContract.increaseAllowance();
  await tx.wait(1);
  const balanceAfter = await protocolContract.getAllowance();
  console.log(`Allowance: ${balanceAfter.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
