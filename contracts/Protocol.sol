// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Token.sol";

contract Protocol {
    // interest on their loan
    address tokenContract;
    uint immutable tokenSupply;
    bool leveraged;
    uint multiplier;
    uint time;
    mapping(address => uint) private ownerToFundsDeposited;
    mapping(address => uint) private ownerToFundsLeveraged;
    mapping(address => uint) private userToDebt;

    event lended(address user, uint amount);
    event tokensIssued(address user, uint amount);
    event borrowed(address user, uint amount, uint multiplier);
    event debtPaid(address user, uint debt);
    event withdrawn(address user, uint amount);
    event interestUpdated(uint time, address user, uint debt);

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
        time = block.timestamp;
        tokenSupply = Token(tokenContract).totalSupply();
        leveraged = false;
        multiplier = 1;
    }

    function lend() external payable {
        require(msg.value > 0, "Supply more money");
        // (bool success, ) = payable(address(this)).call{value: msg.value}("");
        // require(success, "Couldn't keep money in contract");
        ownerToFundsDeposited[msg.sender] += msg.value;
        emit lended(msg.sender, msg.value);
        //issueTokens(msg.value);
    }

    // TODO:: Fix ERC20: Insufficient allowance
    // function issueTokens(uint lendedAmount) internal {
    //     // problems with division?
    //     uint contractBalance = address(this).balance;
    //     uint proportionOfContractBalance = lendedAmount / contractBalance;
    //     uint tokensToBeIssued = tokenSupply * proportionOfContractBalance;
    //     emit tokensIssued(msg.sender, tokensToBeIssued);
    // }

    function borrow() external payable {
        // problems with decimals
        /// If i want to borrow, i need to make sure I have 1.2x the Borrwed Amount already despoited
        require(msg.value > 0);
        if (!leveraged) {
            uint despositRequiredToBorrow = msg.value + ((msg.value * 12) / 10);
            require(
                ownerToFundsDeposited[msg.sender] >= despositRequiredToBorrow,
                "Can only borrow 1.2x what you deposit"
            );
            (bool success, ) = payable(msg.sender).call{value: msg.value}("");
            require(success, "Failure");
            userToDebt[msg.sender] += msg.value;
        } else {
            // only used for levraged, not integrated
            uint amount = msg.value * multiplier;
            require(
                address(this).balance >= amount,
                "Not Enough Funds in Protocol"
            );
            (bool success, ) = payable(msg.sender).call{value: amount}("");
            require(success, "Transfer Failed for Leverage");
            userToDebt[msg.sender] += amount;
        }

        emit borrowed(msg.sender, msg.value, multiplier);
    }

    function leverage(uint _multiplier) public {
        leveraged = true;
        multiplier = _multiplier;
    }

    // :)
    function payDebt() external payable {
        // needs to depend on how much u borrowed and how long u borrowed for
        require(msg.value == userToDebt[msg.sender], "Debt is not equal");
        // (bool success, ) = payable(address(this)).call{value: msg.value}("");
        // require(success);
        userToDebt[msg.sender] = 0;
        emit debtPaid(msg.sender, msg.value);
    }

    // TODO:: Fix ERC20: Insufficient allowance
    function withdraw(uint amount) external payable {
        require(
            address(this).balance >= amount,
            "Balance of contract < msg.value"
        );
        require(userToDebt[msg.sender] <= 0, "Debt is > 0");
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Failure");
        if (ownerToFundsDeposited[msg.sender] >= amount) {
            ownerToFundsDeposited[msg.sender] -= amount;
        }
        //Token(tokenContract).transfer(address(this), getLPTokensOfSender());
        //issueTokens(ownerToFundsDeposited[msg.sender]);

        emit withdrawn(msg.sender, amount);
    }

    // requires chainlink keepers
    function updateInterest() private {
        // 86400 seconds in a day
        require(block.timestamp >= time + 86400);
        time = block.timestamp;

        // fixed interest rate
        // how to represent 0.05 in uint
        userToDebt[msg.sender] += ((userToDebt[msg.sender] * 5) / 100);
        emit interestUpdated(time, msg.sender, userToDebt[msg.sender]);
    }

    function getDebt(address user) external view returns (uint) {
        return userToDebt[user];
    }

    function getDeposits(address user) external view returns (uint) {
        return ownerToFundsDeposited[user];
    }

    function getLPTokensOfUser(address user) public view returns (uint) {
        return Token(tokenContract).balanceOf(user);
    }

    function getLPTokensOfSender() public view returns (uint) {
        return Token(tokenContract).balanceOf(msg.sender);
    }

    function getLPTokensInContract() external view returns (uint) {
        return Token(tokenContract).balanceOf(address(this));
    }

    function getTotalValueLocked() external view returns (uint) {
        return address(this).balance;
    }

    function getAllowance() external view returns (uint) {
        return Token(tokenContract).allowance(msg.sender, address(this));
    }

    receive() external payable {}

    fallback() external payable {}
}
