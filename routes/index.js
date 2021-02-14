var express = require('express');
var router = express.Router();
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');

var contractAddr = '0xDeEeE6260886a75446402f472F378b7695331679';
var abi =
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

function init() {
  var TxObj = Tx.Transaction;
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  web3.eth.getAccounts(console.log);
  let contractInstance = new web3.eth.Contract(abi, contractAddr);
  console.log("contractInstance");

  const account = '0x4778EeE025531193950079e717B3bBf778c1422C';
  const privateKey = Buffer.from('a8b14f2ea6afd4b1eee95e390660f33b6c9b4ebe8fd98d85a669489bb8c648d4', 'hex');

  const _data = contractInstance.methods.set(10).encodeABI();
  console.log(_data);
  var rawTx = {};
  web3.eth.getTransactionCount(account).then(nonce => {
    rawTx = {
      nonce: nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x41409',
      to: contractAddr,
      value: 0,
      data: _data
    }

	var tx = new TxObj(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .on('receipt', console.log);

  });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  init();
  res.render('index', { title: 'Express' });
});

module.exports = router;

