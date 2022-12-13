const { ethers } = require("hardhat");

async function main() {
  const tokenFactory = await ethers.getContractFactory("Token");
  const tokenContract = await tokenFactory.deploy();
  await tokenContract.deployed();

  console.log(`Token Contract deployed to ${tokenContract.address}`);

  const protocolFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = await protocolFactory.deploy(tokenContract.address);
  await protocolContract.deployed();

  console.log(`Protocol deployed to: ${protocolContract.address}`);

  const tx = await tokenContract.transferTokens(protocolContract.address);
  await tx.wait(1);
  console.log(
    `Token Supply in Contract: ${await tokenContract.balanceOf(
      protocolContract.address
    )}`
  );
}

main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
