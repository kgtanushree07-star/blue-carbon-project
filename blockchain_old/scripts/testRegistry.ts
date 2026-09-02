import hre from "hardhat";

async function main() {
  const Registry = await hre.ethers.getContractFactory(
    "BlueCarbonRegistry"
  );

  const registry = await Registry.deploy();

  await registry.waitForDeployment();

  console.log("Contract deployed to:", await registry.getAddress());

  const tx = await registry.registerProject(
    1,
    "Mangrove Restoration Project",
    "Tamil Nadu"
  );

  const receipt = await tx.wait();

  console.log("Project registered successfully!");
  console.log("Transaction Hash:", receipt?.hash);

  const project = await registry.getProject(1);

  console.log("Project ID:", project[0].toString());
  console.log("Project Name:", project[1]);
  console.log("Location:", project[2]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});