import { Outlet } from 'react-router-dom';


const MainPage = (props) => {

  const { wallet, handleConnect, hasProvider, web3Provider } = props.walletData;

  return (
    <>
      <section>
        <main >
          <Outlet context={{ wallet, handleConnect, hasProvider, web3Provider }} />
        </main>
      </section>
    </>
  );
};
export default MainPage;
