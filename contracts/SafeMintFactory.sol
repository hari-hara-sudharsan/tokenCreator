// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SafeMintToken.sol";
import "./LiquidityLock.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SafeMintFactory {

    enum TrustScore { RED, YELLOW, GREEN }

    struct TokenInfo {
    address token;
    address creator;
    TrustScore score;
    address liquidityLock;
    uint256 lockExpiry;
    bool liquidityAdded;
}


    address public router;
    mapping(address => TokenInfo) public tokenInfo;
    address[] public allTokens;

    event TokenCreated(address token, address creator);
    event LiquidityLocked(address token, uint256 ethAmount, uint256 tokenAmount);

    constructor(address _router) {
        router = _router;
    }

    // -------------------------
    // DAY-1 + DAY-2 (unchanged)
    // -------------------------
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 lockMonths
    ) external {

        require(lockMonths == 6 || lockMonths == 12, "Lock must be 6 or 12 months");

        SafeMintToken token = new SafeMintToken(
            name,
            symbol,
            totalSupply,
            address(this)
        );

        uint256 unlockTime = block.timestamp + (lockMonths * 30 days);
        LiquidityLock lock = new LiquidityLock(msg.sender, unlockTime);

        tokenInfo[address(token)] = TokenInfo({
            token: address(token),
            creator: msg.sender,
            score: TrustScore.GREEN,
            liquidityLock: address(lock),
            lockExpiry: unlockTime,
            liquidityAdded: false
        });

        allTokens.push(address(token));
        emit TokenCreated(address(token), msg.sender);
    }

    // -------------------------
    // ⭐ DAY-3 CORE FUNCTION ⭐
    // -------------------------
    function addLiquidityAndLock(
        address token,
        uint256 tokenAmount
    ) external payable {

        TokenInfo storage info = tokenInfo[token];

        require(msg.sender == info.creator, "Not token creator");
        require(!info.liquidityAdded, "Liquidity already added");
        require(msg.value > 0, "ETH required");

        // Approve router to pull tokens
        IERC20(token).approve(router, tokenAmount);

        // Add liquidity — LP tokens go DIRECTLY to LiquidityLock
        IUniswapV2Router02(router).addLiquidityETH{value: msg.value}(
            token,
            tokenAmount,
            0,
            0,
            info.liquidityLock,
            block.timestamp + 300
        );

        info.liquidityAdded = true;

        emit LiquidityLocked(token, msg.value, tokenAmount);
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}

