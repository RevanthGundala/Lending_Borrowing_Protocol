const { ethers } = require("hardhat");
const { protocolAddress } = require("../constants/index");
const value = "0.0005";
const my_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function borrow() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);
  const tx = await protocolContract.borrow({
    value: ethers.utils.parseEther(value),
  });
  await tx.wait(1);
  console.log("Success");

  //   const debt = await protocolContract.getDeposits(my_address);
  //   console.log(`Deposits: ${ethers.utils.formatEther(deposits.toString())}`);
}

borrow()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
