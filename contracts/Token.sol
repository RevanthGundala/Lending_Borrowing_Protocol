//SPDX-License-Identifier

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint private constant tokenNumber = 1000;

    constructor() ERC20("Token", "TKN") {
        _mint(msg.sender, tokenNumber);
    }

    function transferTokens(address to) external virtual {
        _transfer(msg.sender, to, tokenNumber);
    }

    function totalSupply() public view virtual override returns (uint256) {
        return tokenNumber;
    }
}
