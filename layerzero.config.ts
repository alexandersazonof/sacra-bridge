import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

/**
 *  WARNING: ONLY 1 OFTAdapter should exist for a given global mesh.
 *  The token address for the adapter should be defined in hardhat.config. This will be used in deployment.
 *
 *  for example:
 *
 *    sepolia: {
 *         eid: EndpointId.SEPOLIA_V2_TESTNET,
 *         url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org/',
 *         accounts,
 *         oft-adapter: {
 *             tokenAddress: '0x0', // Set the token address for the OFT adapter
 *         },
 *     },
 */
const sonicTestnetContract: OmniPointHardhat = {
    eid: EndpointId.FANTOM_V2_TESTNET,
    contractName: 'SacraOFTAdapter',
}

const arbtrumTestnetContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'SacraOFTAdapter',
}

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'WrappedSacra',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sonicTestnetContract,
        },
        {
            contract: arbtrumTestnetContract,
        },
        {
            contract: sepoliaContract,
        },
    ],
    connections: [
        {
            from: arbtrumTestnetContract,
            to: sepoliaContract,
        },
    ],
}

export default config
