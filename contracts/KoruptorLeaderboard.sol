// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KoruptorLeaderboard {
    struct Koruptor {
        string nama;
        string identitas;
        uint256 jumlah; // Dalam triliun, pake integer
    }

    Koruptor[] public koruptorList;
    address public admin;

    constructor() {
        admin = msg.sender; // Yang deploy jadi admin
    }

    function addKoruptor(string memory _nama, string memory _identitas, uint256 _jumlah) public {
        require(msg.sender == admin, "Hanya admin yang bisa tambah data");
        koruptorList.push(Koruptor(_nama, _identitas, _jumlah));
    }

    function getKoruptorList() public view returns (Koruptor[] memory) {
        return koruptorList;
    }
}