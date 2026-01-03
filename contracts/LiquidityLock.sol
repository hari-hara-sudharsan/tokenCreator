// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityLock {
    address public owner;
    uint256 public unlockTime;
    bool public burned;

    constructor(address _owner, uint256 _unlockTime) {
        owner = _owner;
        unlockTime = _unlockTime;
    }

    function withdraw(address lpToken) external {
        require(msg.sender == owner, "Not owner");
        require(block.timestamp >= unlockTime, "Liquidity still locked");
        require(!burned, "LP burned forever");

        IERC20(lpToken).transfer(
            owner,
            IERC20(lpToken).balanceOf(address(this))
        );
    }

    function burnLP(address lpToken) external {
        require(msg.sender == owner, "Not owner");
        burned = true;

        IERC20(lpToken).transfer(
            address(0),
            IERC20(lpToken).balanceOf(address(this))
        );
    }
}
