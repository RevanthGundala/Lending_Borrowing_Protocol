const { ethers } = require("hardhat");

const protocolAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

async function main() {
  const tokenFactory = await ethers.getContractFactory("Token");
  const tokenContract = tokenFactory.attach(tokenAddress);
  console.log(`Token Supply Before: ${await tokenContract.totalSupply()}`);
  const tx = await tokenContract.transferTokens(protocolAddress);
  await tx.wait(1);
  console.log(
    `Token Supply in Contract: ${await tokenContract.balanceOf(
      protocolAddress
    )}`
  );
}

main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
