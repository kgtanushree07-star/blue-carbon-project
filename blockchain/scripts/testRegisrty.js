const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const registry = await ethers.getContractAt(
    "BlueCarbonRegistry",
    contractAddress
  );

  console.log("Connected to contract:", contractAddress);

  const project = await registry.getProject(1);

  console.log("Project ID:", project[0].toString());
  console.log("Project Name:", project[1]);
  console.log("Location:", project[2]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});