// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SafeMintToken is ERC20 {
    address public factory;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        address factory_
    ) ERC20(name_, symbol_) {
        factory = factory_;
        _mint(factory_, totalSupply_);
    }
}
