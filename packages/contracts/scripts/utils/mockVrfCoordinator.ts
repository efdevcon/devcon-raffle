import { HardhatRuntimeEnvironment } from 'hardhat/types'

export const mockVrfCoordinatorArtifactName =
  'contracts/mocks/VRFCoordinatorV2MockWithERC677.sol:VRFCoordinatorV2MockWithERC677'

export async function connectToMockVrfCoordinator(hre: HardhatRuntimeEnvironment, mockVrfCoordinator: string) {
  const mockVrfCoordinatorFactory = await hre.ethers.getContractFactory(mockVrfCoordinatorArtifactName)
  return mockVrfCoordinatorFactory.attach(mockVrfCoordinator)
}
