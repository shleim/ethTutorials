import { ethers } from "ethers";
import { BigNumber } from "ethers";
import "dotenv/config";

import { getProvider, getSigner, generateNewWallet  } from "./utils.js";

const mainNetProvider = getProvider(true);
const goerliSigner = getSigner();

const myBalance = await goerliSigner.getBalance();
console.log("My balance", ethers.utils.formatEther(myBalance));

console.log("Sending eth to myself");

const tx = await goerliSigner.sendTransaction({
    to: process.env.MY_WALLET_ADDRESS,
    value: myBalance.div(BigNumber.from(10)), //10% of my balance
});

console.log("tx", tx.hash);

await tx.wait();

console.log("TX MINED!");


