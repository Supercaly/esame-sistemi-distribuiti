const fs = require('fs').promises;
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

(async function () {
  try {
    const accounts = await web3.eth.getAccounts();
    const uploaderAddress = accounts[0];

    const abi = JSON.parse(await fs.readFile('./contracts/artifacts/StepCoin.abi'));
    const contract = new web3.eth.Contract(abi);
    const byteCode = await fs.readFile('./contracts/artifacts/StepCoin.bin');

    deployment = await contract.deploy({
      data: byteCode.toString(),
      arguments: [
        1000,
        "StepCoin",
        0,
        "STP"
      ]
    }).send({ from: uploaderAddress, gas: 5000000 });

    console.log('Contract was successfully deployed!');
    console.log('Contract can be interfaced with at this address: '+deployment.options.address);

    await updateDappConfig(deployment.options.address, abi);
    console.log('Dapp config file successfully generated!');
  } catch (err) {
    console.error(err);
  }
})();

updateDappConfig = async (contractAddress, abi) => {
  return fs.writeFile("./dapp/config.js", `config = {"contractAddress": "${contractAddress}", "abiStr": '${JSON.stringify(abi)}'}`);
};
