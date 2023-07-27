
export const transferAmount = async (web3Provider, accounts, address, amount) => {
    try {
        const transaction = await web3Provider.eth.sendTransaction({
            from: accounts[0],
            to: address,
            value: web3Provider.utils.toWei(amount, 'ether')
        });

        return `Transaction successful with hash: ${transaction.transactionHash}`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
};
