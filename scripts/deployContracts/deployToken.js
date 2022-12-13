const { ethers } = require("hardhat");

async function main() {
  const tokenFactory = await ethers.getContractFactory("Token");
  const tokenContract = await tokenFactory.deploy();
  await tokenContract.deployed();

  console.log(`Token Contract deployed to ${tokenContract.address}`);
}

main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
