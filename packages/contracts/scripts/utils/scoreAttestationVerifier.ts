import { HardhatRuntimeEnvironment } from 'hardhat/types'

export const scoreAttestationVerifierArtifactName =
  'contracts/verifier/ScoreAttestationVerifier.sol:ScoreAttestationVerifier'

export async function connectToScoreAttestationVerifier(
  hre: HardhatRuntimeEnvironment,
  scoreAttestationVerifierAddress: string
) {
  const scoreAttestationVerifierFactory = await hre.ethers.getContractFactory(scoreAttestationVerifierArtifactName)
  return scoreAttestationVerifierFactory.attach(scoreAttestationVerifierAddress)
}
