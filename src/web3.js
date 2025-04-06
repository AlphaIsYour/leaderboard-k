import Web3 from "web3";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Contoh: 0x5Fb...
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_nama",
        type: "string",
      },
      {
        internalType: "string",
        name: "_identitas",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_jumlah",
        type: "uint256",
      },
    ],
    name: "addKoruptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getKoruptorList",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "nama",
            type: "string",
          },
          {
            internalType: "string",
            name: "identitas",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "jumlah",
            type: "uint256",
          },
        ],
        internalType: "struct KoruptorLeaderboard.Koruptor[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "koruptorList",
    outputs: [
      {
        internalType: "string",
        name: "nama",
        type: "string",
      },
      {
        internalType: "string",
        name: "identitas",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "jumlah",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3 = new Web3("http://127.0.0.1:8545"); // RPC Hardhat
const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };
