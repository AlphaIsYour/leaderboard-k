async function main() {
  const KoruptorLeaderboard = await ethers.getContractFactory(
    "KoruptorLeaderboard"
  );
  const kontrak = await KoruptorLeaderboard.deploy();
  await kontrak.deployed();
  console.log("Kontrak deployed ke:", kontrak.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
