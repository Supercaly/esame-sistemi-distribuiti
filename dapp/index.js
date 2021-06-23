const contractAddress = config.contractAddress;
const web3 = new Web3('http://localhost:8545');

getContract = (web3, address) => {
    const abi = JSON.parse(config.abiStr);
    return new web3.eth.Contract(abi, address);
};

const contract = getContract(web3, contractAddress);

window.onload = async() => {
    tokenName = await contract.methods.name().call();
    tokenSymbol = await contract.methods.symbol().call();
    document.getElementById('token-name-txt').innerHTML = `${tokenName} - ${tokenSymbol}`
    document.getElementById('contract-name-txt').innerHTML = `[${contractAddress}]`
};

// current balance button click
document.getElementById('current-balance-btn').onclick = async () => {
    try {
        userAddr = getUserAddress();
        tokenSymbol = await contract.methods.symbol().call({ from: userAddr });
        userBalance = await contract.methods.balanceOf(userAddr).call({ from: userAddr });
        document.getElementById('current-balance-txt').innerHTML = `${userBalance} ${tokenSymbol}`;
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

// Transfer button click
document.getElementById('transfer-btn').onclick = async () => {
    try {
        transferTo = document.getElementById('transfer-to-input').value;
        transferAmount = document.getElementById('transfer-amount-input').value;
        console.log(await contract.methods
            .transfer(transferTo, transferAmount)
            .send({ from: getUserAddress() }));
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

// Transfer from button click
document.getElementById('transfer-from-btn').onclick = async () => {
    try {
        transferFrom = document.getElementById('transfer-from-from-input').value;
        transferTo = document.getElementById('transfer-from-to-input').value;
        transferAmount = document.getElementById('transfer-from-amount-input').value;
        await contract.methods.transferFrom(transferFrom, transferTo, transferAmount)
            .send({ from: getUserAddress() });
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

// Approve button click
document.getElementById('approve-btn').onclick = async () => {
    try {
        approveSpender = document.getElementById('approve-spender-input').value;
        approveAmount = document.getElementById('approve-amount-input').value;
        await contract.methods.approve(approveSpender, approveAmount)
            .send({ from: getUserAddress() });
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

// Is Allowed button click
document.getElementById('allowed-btn').onclick = async () => {
    positiveColor = "#57AD69";
    negativeColor = "#E2325A";
    answerTxt = document.getElementById('allowed-answer-txt');
    
    try {
        allowedOwner = document.getElementById('allowed-owner-input').value;
        allowedSpender = document.getElementById('allowed-spender-input').value;
        allowance = await contract.methods.allowance(allowedOwner, allowedSpender)
            .call({ from: getUserAddress() });

        if (allowance > 0) {
            answerTxt.innerHTML = `Yes - remaining: ${allowance}`;
            answerTxt.style.color = positiveColor;
        } else {
            answerTxt.innerHTML = "No";
            answerTxt.style.color = negativeColor;
        }
    } catch (err) {
        console.error(err);
        answerTxt.innerHTML = "No";
        answerTxt.style.color = negativeColor;
    }
};

// Forge button click
document.getElementById('forge-btn').onclick = async () => {
    try {
        forgeAmount = document.getElementById('forge-amount-input').value;
        await contract.methods.forge(forgeAmount).send({ from: getUserAddress() });
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

// Burn button click
document.getElementById('burn-btn').onclick = async () => {
    try {
        burnAmount = document.getElementById('burn-amount-input').value;
        await contract.methods.burn(burnAmount).send({ from: getUserAddress() });
    } catch (err) {
        console.error(err);
        alert(err);
    }
};

getUserAddress = () => document.getElementById('user-address-input').value;