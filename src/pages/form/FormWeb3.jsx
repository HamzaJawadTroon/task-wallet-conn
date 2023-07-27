import "assets/css/design.css"
import { LOGIN } from 'helpers/page-urls';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { formatChainAsNum } from 'hooks/formate';
import { transferAmount } from 'helpers/web3Transfer'


const FormWeb3 = () => {

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const { wallet, web3Provider } = useOutletContext();

  const navigate = useNavigate()
  

  useEffect(() => {
    console.log(wallet);
    if (wallet.accounts.length === 0) {
      navigate(LOGIN);
    }
  }, [wallet])

   return (
        <div className="text-center box">
            <h2>Transfer</h2>
            <div className="form" action="/home">
                <p>
                    <label>Recievers Address</label><br/>
                    <input type="text" name="address" value={address} onChange={handleAddressChange} required />
                </p>
                <p>
                    <label>Amount </label>
                    <br/>
                    <input type="number" name="value" value={amount} onChange={handleAmountChange} required />
                </p>
                <p>
                    <button 
                      id="sub_btn"
                      onClick={async () => {
                        setIsButtonDisabled(true);
                        await transferAmount(web3Provider, wallet.accounts, address, amount)
                        setIsButtonDisabled(false);
                      }}
                      disabled={isButtonDisabled}>
             
                        {isButtonDisabled ? 'Processing...' : 'Send'}
                    </button>
                </p>
            </div>
            <footer>
                <p>Your Address: { wallet.accounts[0] }  </p>
                <p>Remaining Balance: { wallet.balance }  ||  ChainId: {formatChainAsNum(wallet.chainId)}</p>
            </footer>
        </div>
    )
};
export default FormWeb3;
