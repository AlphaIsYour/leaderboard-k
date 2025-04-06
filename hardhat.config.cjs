require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20", // Versi Solidity sesuai kontrak
  networks: {
    hardhat: {
      chainId: 1337, // Default chain ID buat Hardhat lokal
    },
  },
};
