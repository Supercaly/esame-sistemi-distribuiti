// SPDX-License-Identifier: MIT

/*
 * Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
*/


pragma solidity ^0.8.5;

import "./EIP20Interface.sol";

contract StepCoin is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    address private owner;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 public initialAmount;
    
    string public name;                   //Token Name
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX

    constructor (
        uint256 _initialAmount,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol
    ) {
        initialAmount = _initialAmount;                 // Store the initial amount of tokens since tey will change
        owner = msg.sender;                             // Set the creator as the owner of the contract
        balances[msg.sender] = _initialAmount;          // Give the creator all initial tokens
        totalSupply = _initialAmount;                   // Update total supply
        name = _tokenName;                              // Set the name for display purposes
        decimals = _decimalUnits;                       // Amount of decimals for display purposes
        symbol = _tokenSymbol;                          // Set the symbol for display purposes
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        uint256 _allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && _allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (_allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) public view override returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view override returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    
    function forge(uint _amount) public payable{
        require(msg.sender == owner);
        totalSupply += _amount;
		balances[msg.sender] += _amount;
	}
	
	function burn(uint _amount) public payable{
	    require(msg.sender == owner);
	    require(balances[msg.sender] >= _amount);
	    totalSupply -= _amount;
		balances[msg.sender] -= _amount;
	}
}