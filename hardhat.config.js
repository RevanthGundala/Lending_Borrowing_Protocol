require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;
module.exports = {
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/kJJBWWYl9WNqZwafkWKJpXql_410t89i",
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
