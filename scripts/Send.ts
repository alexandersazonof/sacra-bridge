import { ethers } from 'hardhat'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import { ERC20__factory, SacraOFTAdapter__factory } from '../typechain-types'

const ADAPTER_ADDRESS = '0x9E3011503B088E269F81D3dc1399272d79B32859'

async function main() {
    const signer = (await ethers.getSigners())[0]
    const contract = SacraOFTAdapter__factory.connect(ADAPTER_ADDRESS, signer)

    const token = ERC20__factory.connect('0x02985950f065df3Dd58454e1B3fb840AD0631573', signer)

    // approve

    const tx1 = await token.approve(ADAPTER_ADDRESS, ethers.constants.MaxUint256)
    const receipt1 = await tx1.wait()
    console.log('Transaction was confirmed in block:', receipt1?.blockNumber || 0)
    // quote
    const sendParam = {
        dstEid: EndpointId.SEPOLIA_V2_TESTNET,
        to: ethers.utils.hexZeroPad(signer.address, 32),
        amountLD: ethers.utils.parseUnits('10', 18),
        minAmountLD: ethers.utils.parseUnits('9', 18),
        extraOptions: '0x0003010011010000000000000000000000000000c350',
        composeMsg: ethers.constants.HashZero,
        oftCmd: ethers.constants.HashZero,
    }

    const tx2 = await contract.quoteSend(sendParam, false)
    console.log('Quote:', tx2[0])

    // send

    const fee = {
        nativeFee: tx2[0],
        lzTokenFee: tx2[1],
    }

    const txResponse = await contract.send(sendParam, fee, signer.address, {
        value: tx2[0],
    })
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
