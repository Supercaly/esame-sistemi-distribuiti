window.onload = () => {
    // Set the contract info
    document.getElementById('token-name-txt').innerHTML = "StepToken - STP";
    document.getElementById('token-value-txt').innerHTML = "0.6 $/STP";

    // document.getElementById('execute-btn').onclick = () => {
    //     const web3 = new Web3('http://localhost:8545');
    //     //const addr = '0xc9F26f69e0771E697aAbE4E8Be5F097aDf76D783';
    //     const contractAddr = document.getElementById('contract-addr-input').value;
    //     const userAddr = document.getElementById('user-addr-input').value;

    //     const contract = getContract(web3, contractAddr);
    //     contract.methods.getInteger().call({ from: userAddr })
    //         .then((result) => {
    //             console.log(result);
    //             //document.getElementById('label').innerHTML = result;
    //         }).catch((err) => {
    //             console.error(err);
    //         });
    // }
};

document.getElementById('current-balance-btn').onclick = () => {
    document.getElementById('current-balance-txt').innerHTML = "123456 STP";
};

document.getElementById('transfer-btn').onclick = () => {
    transferTo = document.getElementById('transfer-to-input').value;
    transferAmount = document.getElementById('transfer-amount-input').value;
    console.log(transferAmount+" "+transferTo);
};

document.getElementById('transfer-from-btn').onclick = () => {
    transferFrom = document.getElementById('transfer-from-from-input').value;
    transferTo = document.getElementById('transfer-from-to-input').value;
    transferAmount = document.getElementById('transfer-from-amount-input').value;
    console.log(transferAmount+" "+transferFrom+" "+transferTo);
};

getContract = (web3, address) => {
    const abi = JSON.parse('[{ "inputs": [], "name": "getInteger", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }]');
    return new web3.eth.Contract(abi, address);
};