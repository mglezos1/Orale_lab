// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract MFLoanOracle {
address owner;

uint iRate100;

constructor() {
//owner = msg.sender;
iRate100=1;
}




//modifier onlyOwner {
//require(
//msg.sender == owner,
//"Only owner can call this function."
//);
//_;
//}
//interest rate
function getRate() public view returns(uint) {
return iRate100;

}

function setRate(uint rate) public{
    require (rate >0, "Interest: must be more the zero");
    iRate100=rate;

}
}