// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const WhalyFactory = await ethers.getContractFactory("WhalyFactory");

  const token = await WhalyFactory.deploy(
    "ipfs/QmWWWg3v7kdBhUM5ed97JDdeWg9jFhDboQnbY4KvbmTTVA/"
  );

  await token.waitForDeployment();

  console.log(`WhalyFactory deployed to ${token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
