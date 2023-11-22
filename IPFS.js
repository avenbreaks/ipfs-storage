var ethers = require('ethers');

var provider = new ethers.providers.JsonRpcProvider("https://tokioswift.engram.tech");
var contractAddress = "0xd122CA6C5b327193C7706aeA37ebb548f37DF9F8";
var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var contract = new ethers.Contract(contractAddress, abi, provider);

function getHashFromContract() {
    return contract.getHash()
        .then(function(hash) {
            return hash;
        })
        .catch(function(error) {
            console.error('Error fetching hash from contract:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    getHashFromContract().then(function(hash) {
        if (hash) {
            document.getElementById("btn").addEventListener('click', function() {
                window.location.href = "https://ipfs.io/ipfs/" + hash;
            });
        }
    });
});
