import { ethers } from "ethers";
import "dotenv/config";

const getProvider = (mainnet = false) => {
    const providerUrl = mainnet 
    ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
    : `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`;

    //console.log("url", providerUrl);
    return new ethers.providers.JsonRpcProvider(providerUrl);
}

const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();
}

const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);
    return new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);
}

//es6 module syntax  - added "type": "module" in package.json to be able to export functions
export { getProvider, getSigner, generateNewWallet };

//console.log("Signer address", await getSigner().getAddress());

// const provider = getProvider();
// console.log("Provider network", await provider.getNetwork());