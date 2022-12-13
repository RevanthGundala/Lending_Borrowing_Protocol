const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");
const value = "0.001";

async function lend() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);

  const deposits = await protocolContract.getDeposits(my_address);
  console.log(`Deposits: ${ethers.utils.formatEther(deposits.toString())}`);
}

lend()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
