import { ethers } from 'hardhat'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import { OFT__factory } from '../typechain-types'

// ARB to SEPOLIA
const FROM_PEER = '0x9E3011503B088E269F81D3dc1399272d79B32859'
const TO_PEER = '0x5150e4861eEA0e98A0771ea39E6B8b75eAC6FcFa'
const EID = EndpointId.SEPOLIA_V2_TESTNET

// SEPOLIA to ARB
// const FROM_PEER = '0x5150e4861eEA0e98A0771ea39E6B8b75eAC6FcFa'
// const TO_PEER = '0x9E3011503B088E269F81D3dc1399272d79B32859'
// const EID = EndpointId.ARBSEP_V2_TESTNET

async function main() {
    const signer = (await ethers.getSigners())[0]
    const contract = OFT__factory.connect(FROM_PEER, signer)

    const txResponse = await contract.setPeer(EID, ethers.utils.hexZeroPad(TO_PEER, 32))
    console.log('Transaction hash:', txResponse.hash)

    const receipt = await txResponse.wait()
    console.log('Transaction was confirmed in block:', receipt?.blockNumber || 0)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
