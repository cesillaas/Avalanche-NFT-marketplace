import { ethers } from "hardhat";

async function main() {
  // 1st contract
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nft = await NFTCollection.deploy("TeaNFT", "TEA");
  await nft.deployed();
  console.log(` NFTCollection deployed at: ${nft.address}`);

  // 2nd contract
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log(` Marketplace deployed at: ${marketplace.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(" Deploy Error:", error);
    process.exit(1);
  });
