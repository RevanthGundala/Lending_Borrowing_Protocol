const { ethers } = require("hardhat");
const tokenContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

async function main() {
  const protocolFactory = await ethers.getContractFactory("Protocol");
  const protocolContract = await protocolFactory.deploy(tokenContractAddress);
  await protocolContract.deployed();

  console.log(`Protocol deployed to: ${protocolContract.address}`);
}

main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
