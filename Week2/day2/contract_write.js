import { ethers } from "ethers";
import { getProvider, getSigner, generateNewWallet  } from "./utils.js";
import sanfordNFTAbi from "./abi/sanfordNFTAbi.js"

const goerliSigner = getSigner();
const sanfordNFTAddress = "0x6E2756D5A4780c4d26De0A91f0c0AF5CE77cBC34";// this is rinkeby address, doesn't exist on goerli. Need to deploy the contract on goerli and use that address

const sanfordContract = new ethers.Contract(
    sanfordNFTAddress,
    sanfordNFTAbi,
    goerliSigner
);

const mintPrice = await sanfordContract.MINT_PRICE();
console.log("SanfordStout mint price", ethers.utils.formatEther(mintPrice));

console.log("Minting NFT");
const mintTx = await sanfordContract.mint({
    value: mintPrice,
});
console.log("TX set", mintTx.hash);
