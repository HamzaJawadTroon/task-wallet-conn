import { ethers } from "ethers";

const formatBalance = (val) => {
    return ethers.formatEther(val)
}

const formatChainAsNum = (val) => {
    return parseInt(val)
}

export { formatChainAsNum, formatBalance };