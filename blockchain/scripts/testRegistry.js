const hre = require("hardhat");

async function main() {
    const registryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const registry = await hre.ethers.getContractAt(
        "BlueCarbonRegistry",
        registryAddress
    );

    console.log("Connected to contract!");

    const tx = await registry.registerProject(
        2,
        "Coastal Blue Carbon Project",
        "Coimbatore"
    );

    await tx.wait();

    console.log("Project registered successfully!");
    console.log("Transaction Hash:", tx.hash);

    const project = await registry.getProject(2);

    console.log("Project ID:", project[0].toString());
    console.log("Project Name:", project[1]);
    console.log("Location:", project[2]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});