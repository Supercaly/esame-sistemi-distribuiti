const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const byteCode = fs.readFileSync('./contracts/artifacts/StepCoin.bin');
const abi = JSON.parse(fs.readFileSync('./contracts/artifacts/StepCoin.abi'));

(async function () {
  const accounts = await web3.eth.getAccounts();
  const uploaderAddress = accounts[0];

  const contract = new web3.eth.Contract(abi);

  return contract.deploy({
    data: byteCode.toString(),
    arguments: [
      1000,
      "StepCoin",
      0,
      "STP"
    ]
  }).send({
    from: uploaderAddress,
    gas: 5000000
  }).then((deployment) => {
    console.log('Contract was successfully deployed!');
    console.log('Contract can be interfaced with at this address:');
    console.log(deployment.options.address);
  }).catch((err) => {
    console.error(err);
  });
})();
