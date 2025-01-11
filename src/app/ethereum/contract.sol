// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZeroToDappToken is ERC20, Ownable {
    uint256 public constant MINT_AMOUNT = 5 * (10 ** 18); 
    uint256 public constant MINT_LIMIT = 2;              
    uint256 public constant PERIOD = 5 seconds;           
    uint256 public blocktimestamp = block.timestamp;

    struct MintingInfo {
        uint256 lastMintTime;   
    }

    mapping(address => MintingInfo) public mintingRecords;


    constructor(
        string memory _name, 
        string memory _symbol 
    ) ERC20(_name, _symbol) Ownable(msg.sender){
        
    }


    function mint() external {
        MintingInfo storage record = mintingRecords[msg.sender];
        uint256 currentTime = block.timestamp;

        require(
            currentTime >= record.lastMintTime + PERIOD,
            "You can mint only once during the cooldown period."
        );

        record.lastMintTime = currentTime;
        _mint(msg.sender, MINT_AMOUNT);
    }

    function ownerMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
