// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract IgorToken {
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;

    mapping(address => uint256) public balances;
    
    function create(uint256 quantity) public {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }

    function sendTo(address to, uint256 quantity) public {
        require(balances[msg.sender] >= quantity, "You don't have enough tokens to send");
        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }
}