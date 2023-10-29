const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contract with account:", deployer.address);
  
  const Create = await hre.ethers.getContractFactory("Create");
  const create = await Create.deploy();
  
  console.log("Contract deployment transaction:", create.deployTransaction.hash);

  await create.deployed();
  console.log("Contract deployed to:", create.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
