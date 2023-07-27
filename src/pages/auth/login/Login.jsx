import 'assets/css/screen.css'
import {  useEffect } from 'react'
import { formatChainAsNum } from 'hooks/formate'  /* New */
import { Form_Web3 } from 'helpers/page-urls';
import { useNavigate } from 'react-router-dom';
import "assets/css/design.css"


const LoginPage = (props) => {
  const { wallet, handleConnect, hasProvider } = props.walletData;
  const navigate =  useNavigate()

  useEffect(() => {
    console.log(wallet.accounts.length);
    if (wallet.accounts.length > 0) {
      navigate(Form_Web3);
    }
  }, [wallet])

  return (
    <div className="box">

      {
        window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
        <button className='connect-button' onClick={handleConnect}>Connect MetaMask</button>
      }

      <h4>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</h4> 
      <br /> <br />

      { wallet.accounts.length > 0 &&
        <>                                                               
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>                    
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div> 
        </>
      }
    </div>
  )
}

export default LoginPage