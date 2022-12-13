const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");
const value = "0.001";

async function withdraw() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);
  const deposit = (await protocolContract.getDeposits(my_address)).toString();
  const tx = await protocolContract.withdraw(deposit);
  await tx.wait(1);
  console.log("Success");

  //   const debt = await protocolContract.getDeposits(my_address);
  //   console.log(`Deposits: ${ethers.utils.formatEther(deposits.toString())}`);
}

withdraw()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
