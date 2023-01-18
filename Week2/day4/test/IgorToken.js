const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("IgorToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToken() {       
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();      
  
      const IgorToken = await ethers.getContractFactory("IgorToken");
      const igorToken = await IgorToken.deploy();
  
      return { igorToken, owner, otherAccount};
    }
  
    describe("Deployment", function () {
      it("Should set the total supply to 1000", async function () {
        const { igorToken} = await loadFixture(deployToken);
  
        expect(await igorToken.totalSupply()).to.equal(BigInt(1000));
      });
      
    });
  
    // describe("Get", function () {
    //     it("Should get the right counter", async function () {
    //         const { counter , initialCount} = await loadFixture(deployWithCounter10);

    //         expect(await counter.get()).to.equal(initialCount);
    //     });
    // });

    // describe("Inc", function () {
    //     it("Should increment the counter by 1", async function () {
    //         const { counter , initialCount} = await loadFixture(deployWithCounter10);
            
    //         await counter.inc();
    //         expect(await counter.get()).to.equal(initialCount+BigInt(1));
    //     });
    // });

    // describe("Dec", function () {
    //     it("Should decrement the counter by 1", async function () {
    //         const { counter , initialCount} = await loadFixture(deployWithCounter10);
            
    //         await counter.dec();
    //         expect(await counter.get()).to.equal(initialCount-BigInt(1));
    //     });

    //     it("Should decrement the counter by owner", async function () {
    //         const { counter , initialCount} = await loadFixture(deployWithCounter10);
            
    //         await counter.dec();
    //         expect(await counter.get()).to.equal(initialCount-BigInt(1));
    //     });

    //     it("Should revert with the right message if dec called by not the owner", async function () {
    //         const { counter , otherAccount} = await loadFixture(deployWithCounter10);
            
    //         await expect(counter.connect(otherAccount).dec()).to.be.revertedWith(
    //             "Not owner"
    //           );
    //     });
    // });
  });
  