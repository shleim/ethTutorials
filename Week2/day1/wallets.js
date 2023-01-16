import { ethers } from "ethers";
import "dotenv/config";

//const wallet = ethers.Wallet.createRandom();

// console.log("address:", wallet.address);
// console.log("private key:", wallet.privateKey);
// console.log("mnemonic:", wallet.mnemonic.phrase);

// let path, myWallet;

// for(let i=0; i<10; i++ ) {
//     console.log(i);
//     path = `m/44'/60'/0'/0/${i}`;
//     myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
//     console.log("address:", i, myWallet.address);
//     console.log("private key:", i, myWallet.privateKey);
// }

//const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`; 
const infuraUrl = `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`; 
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

const wallet = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY);
wallet.connect(provider);
console.log("Is signer?", wallet._isSigner);
console.log("wallet balance",
            ethers.utils.formatEther( await provider.getBalance(wallet.address))
 );

const signature = await wallet.signMessage("Hello");
console.log("Signed message", signature);

const signerAddress = ethers.utils.verifyMessage("Hello", signature);
console.log("signerAddress", signerAddress);


