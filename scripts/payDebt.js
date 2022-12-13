const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");
const value = "0.0001";

async function payDebt() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);
  const debt = await protocolContract.getDebt(my_address);
  const tx = await protocolContract.payDebt({
    value: debt,
  });
  await tx.wait(1);
  console.log("Success");

  //   const debt = await protocolContract.getDeposits(my_address);
  //   console.log(`Deposits: ${ethers.utils.formatEther(deposits.toString())}`);
}

payDebt()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
