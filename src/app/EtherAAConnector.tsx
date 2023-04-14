import React, { useState, useMemo } from 'react'
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'
import {
  SocialWallet,
  GoogleSocialWallet,
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet,
} from '@zerodevapp/social-wallet'
const EtherAAConnector = () => {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])
  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
      owner: await getSocialWalletOwner(
        process.env.NEXT_PUBLIC_PROJECT_ID as string,
        socialWallet
      ),
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }
  const disconnect = async () => {
    await socialWallet.disconnect()
    setAddress('')
  }

  const connected = !!address
  return (
    <div className='text-2xl text-center pt-3 flex flex-col gap-y-4 font-semibold bg-gray-200 h-full'>
      <span>Account Abstraction Using Social Logins</span>
      {connected && (
        <div>
          <label>Wallet: {address}</label>
        </div>
      )}
      <div>
        {!connected && (
          <button
            className={` rounded-full ${
              loading ? 'bg-purple-400' : 'bg-purple-500'
            } py-2 text-white px-7 max-w-xs mx-auto text-lg`}
            onClick={createWallet}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Create Wallet'}
          </button>
        )}
        {connected && (
          <button
            className={` rounded-full ${
              loading ? 'bg-purple-400' : 'bg-purple-500'
            } py-2 text-white px-7 max-w-xs mx-auto text-lg`}
            onClick={disconnect}
            disabled={loading}
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  )
}

export default EtherAAConnector
