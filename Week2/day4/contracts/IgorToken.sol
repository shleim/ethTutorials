// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract IgorToken {
    event Buy(address indexed buyer);

    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;
    address public immutable owner;

    uint256 public constant CREATION_PRICE = 0.01 ether;

    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {        
        owner = msg.sender;
    }

    function create(uint256 quantity) public onlyOwner {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }

    function sendTo(address to, uint256 quantity) public {
        require(balances[msg.sender] >= quantity, "You don't have enough tokens to send");
        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }

     function buy() public payable {
        require(totalCreated < totalSupply, "totalSupply reached!");
        require(msg.value == CREATION_PRICE, "Incorrect ETH price");

        balances[msg.sender] += 1;
        totalCreated += 1;

        emit Buy(msg.sender);
    }

    function withdraw() public onlyOwner {
        // get the amount of Ether stored in this contract
        uint amount = address(this).balance;

        // send all Ether to owner
        // Owner can receive Ether since the address of owner is payable
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }
}