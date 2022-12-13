const { ethers } = require("hardhat");
const { protocolAddress, my_address } = require("../constants/index");

async function main() {
  const protocolContractFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = protocolContractFactory.attach(protocolAddress);

  const debt = await protocolContract.getDebt(my_address);
  console.log(`Debt: ${ethers.utils.formatEther(debt.toString())}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
