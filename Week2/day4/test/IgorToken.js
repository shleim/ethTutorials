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
        const { igorToken, owner} = await loadFixture(deployToken);
  
        expect(await igorToken.totalSupply()).to.equal(1000);
        expect(await igorToken.owner()).to.equal(owner.address);
      });
      
    });
  
    describe("Create", function () {
        it("Should create a 100 tokens for the owner", async function () {
            const { igorToken , owner} = await loadFixture(deployToken);

            await igorToken.create(100);

            expect(await igorToken.balances(owner.address)).to.equal(100);
        });

        it("Should revert if created quantity is greater than totalSupply", async function () {
            const { igorToken , owner} = await loadFixture(deployToken);
            const totalSupply = await igorToken.totalSupply();

            await expect(igorToken.create(totalSupply.add(100))).to.be.reverted;            
        });

        it("Should revert if created by not the owner", async function () {
            const { igorToken , owner, otherAccount} = await loadFixture(deployToken);
            
            await expect(igorToken.connect(otherAccount).create(100)).to.be.revertedWith(
                "Not owner"
              );       
        });
    });

    describe("SendTo", function () {
        it("Should send 100 tokens from the signer to another account", async function () {
            const { igorToken, owner, otherAccount } = await loadFixture(deployToken);
            
            await igorToken.create(200);
            expect(await igorToken.balances(owner.address)).to.equal(200);
            expect(await igorToken.balances(otherAccount.address)).to.equal(0);

            await igorToken.sendTo(otherAccount.address, 50);
            expect(await igorToken.balances(owner.address)).to.equal(150);
            expect(await igorToken.balances(otherAccount.address)).to.equal(50);
        });

        it("Should revert if trying to send more than owned", async function () {
            const { igorToken , owner, otherAccount} = await loadFixture(deployToken);
            
            await igorToken.create(200);

            await expect(igorToken.sendTo(otherAccount.address, 201)).to.be.reverted;            
        });
    });

    describe("Buy", function () {
        it("Should buy 1 token", async function () {
            const { igorToken, owner, otherAccount } = await loadFixture(deployToken);
            
            await igorToken.buy({ value: ethers.utils.parseEther("0.01") });
            expect(await igorToken.balances(owner.address)).to.equal(1);            
        });

        it("Should revert if buying with wrong price", async function () {
            const { igorToken , owner, otherAccount} = await loadFixture(deployToken);

            await expect(igorToken.buy({ value: ethers.utils.parseEther("0.02") })).to.be.reverted;            
        });
    });
  });
  