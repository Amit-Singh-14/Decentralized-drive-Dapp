require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [`0xbd7a09b96284e99b2f5d700eb2fba4ab66ccce044acc08cdea106a0b832ec010`],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
