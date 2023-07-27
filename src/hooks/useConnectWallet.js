import 'assets/css/screen.css'
import { useState, useEffect } from 'react'
import { formatBalance } from 'hooks/formate' 
import detectEthereumProvider from '@metamask/detect-provider'
import { login, logoutStatic } from 'redux/actions/auth/authSlice';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';


const useConnectWallet = () => {
  const [hasProvider, setHasProvider] = useState(false)
  const initialState = { accounts: [], balance: "", chainId: "" }  
  const [wallet, setWallet] = useState(initialState)
  const [web3Provider, setWeb3provider] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
        dispatch(login(wallet))
        setWeb3provider(new Web3(window.ethereum))
      } else {
        setWallet(initialState)
        dispatch(logoutStatic())
        setWeb3provider(null)
      }
    }

    const refreshChain = (chainId) => {               
      setWallet((wallet) => ({ ...wallet, chainId }))      
    }                                                    

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {                                           
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)  
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain) 
    }
  }, [])

  const updateWallet = async (accounts) => {
    const balance = formatBalance(await window.ethereum.request({   
      method: "eth_getBalance",                                      
      params: [accounts[0], "latest"],                                 
    }))                                                               
    const chainId = await window.ethereum.request({                   
      method: "eth_chainId",                                           
    })                                                                 
    setWallet({ accounts, balance, chainId })                        
  }

  const handleConnect = async () => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      updateWallet(accounts)
    } catch (e) {
      console.log(e);
    }
  }

  return { wallet, handleConnect, hasProvider, web3Provider };
}

export default useConnectWallet