'use client'
import React, { useState } from 'react'
import { Contract, Wallet } from 'ethers'
import { getZeroDevSigner } from '@zerodevapp/sdk'
import EtherAAConnector from './EtherAAConnector'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string
const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
const contractABI = [
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)',
]
const HomePage = () => {
  const [loading, setloading] = useState(false)
  const [mintedNFT, setmintedNFT] = useState({
    address: '0x0508838542A2915969F8b9f28BF6Fd3367936736',
    balance: 0,
  })
  const handleClick = async () => {
    setloading(true)

    const wallet = new Wallet(privateKey)
    const signer = await getZeroDevSigner({
      projectId,
      owner: wallet,
    })
    const address = await signer.getAddress()
    console.log('My address:', address)

    const nftContract = new Contract(contractAddress, contractABI, signer)

    const receipt = await nftContract.mint(address)
    await receipt.wait()
    const balance = await nftContract.balanceOf(address)
    console.log(parseInt(balance._hex))
    // console.log(balance._hex)
    console.log(await balance.BigNumber)
    console.log(`NFT balance: ${await nftContract.balanceOf(address)}`)
    setmintedNFT({
      address: address,
      balance: parseInt(balance._hex),
    })
    setloading(false)
  }

  return (
    <div className='flex flex-col  divide-dashed divide-y-4 divide-purple-400 h-screen  '>
      <div className=' text-2xl text-center pt-3 flex flex-col gap-y-4 font-semibold bg-gray-200 h-full '>
        <span>Mint Gassless NFT</span>
        <button
          className={` rounded-full ${
            loading ? 'bg-purple-400' : 'bg-purple-500'
          } py-2 text-white px-7 max-w-xs mx-auto text-lg`}
          disabled={loading}
          onClick={() => handleClick()}
        >
          {loading ? (
            <div className='flex items-center'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 mr-2 animate-spin  fill-purple-900'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              Processing...
            </div>
          ) : (
            'Mint NFT'
          )}
        </button>
        <div>
          My Address:
          {loading ? (
            'loading...'
          ) : (
            <span className=' text-lg pl-4'>{mintedNFT.address}</span>
          )}
        </div>
        <div>NFT balance:{loading ? 'loading...' : mintedNFT.balance}</div>
        <a
          className='text-purple-600 italic underline'
          target='_blank'
          rel='noopener noreferrer'
          href='https://mumbai.polygonscan.com/address/0x0508838542A2915969F8b9f28BF6Fd3367936736#tokentxnsErc721'
        >
          Link to Verify My Gassless transactions
        </a>
      </div>
      <EtherAAConnector />
      {/* <div className=' text-2xl text-center pt-3 flex flex-col gap-y-4 font-semibold bg-gray-200 h-full '>
        <span>Account Abstraction Using Wgami and ZeroDev SDK</span>
        <button
          className={` rounded-full ${
            loading ? 'bg-purple-400' : 'bg-purple-500'
          } py-2 text-white px-7 max-w-xs mx-auto text-lg`}
          disabled={loading}
          onClick={() => handleClick()}
        >
          {loading ? (
            <div className='flex items-center'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 mr-2 animate-spin  fill-purple-900'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              Processing...
            </div>
          ) : (
            'Mint NFT'
          )}
        </button>
        <div>
          My Address:
          {loading ? (
            'loading...'
          ) : (
            <span className=' text-lg pl-4'>{mintedNFT.address}</span>
          )}
        </div>
        <div>NFT balance:{loading ? 'loading...' : mintedNFT.balance}</div>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://mumbai.polygonscan.com/address/0x0508838542A2915969F8b9f28BF6Fd3367936736#tokentxnsErc721'
        >
          Link to Verify a Gassless transaction
        </a>
      </div> */}
    </div>
  )
}

export default HomePage
