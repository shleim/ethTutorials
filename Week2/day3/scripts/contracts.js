const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");


async function main() {
    const contractAddress = "0x581aEE25AA3BD245D2347a004e132Dcf36C6B670";
    const lockContract = await hre.ethers.getContractAt("Lock", contractAddress);
    
    console.log("Initial lock owner", await lockContract.owner());

    const unlockTimeStamp = await lockContract.unlockTime();
    const unlockDate = new Date(unlockTimeStamp * 1000);
    console.log("Unlock time", unlockDate.toUTCString());

    var contractBalance = await hre.ethers.provider.getBalance(contractAddress);
    console.log("contract balance before withdrawal", ethers.utils.formatEther(contractBalance));

    // const withdrawTx = await lockContract.withdraw();
    // await withdrawTx.wait();
    // console.log("Withdraw done!");

//     contractBalance = await hre.ethers.provider.getBalance(contractAddress);
//     console.log("contract balance after withdrawal", ethers.utils.formatEther(contractBalance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
