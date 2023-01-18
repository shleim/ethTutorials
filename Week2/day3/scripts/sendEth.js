const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");


async function main() {

    //const localProviderUrl = "http://127.0.0.1:8545/"; 
    //const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);

    const account0Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    //const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);    
    
    const signer = (await hre.ethers.getSigners())[0];
    
    const account0Balance = await signer.getBalance();
    
    //const account0Balance = await provider.getBalance(account0Address);
    console.log("account0Balance", ethers.utils.formatEther(account0Balance));

    const tx = await signer.sendTransaction({
        to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        value: account0Balance.div(BigNumber.from(10)), //10% of my balance
    });
    
    console.log("tx", tx.hash);
    
    await tx.wait();
    
    console.log("TX MINED!");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
