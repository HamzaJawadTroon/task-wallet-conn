import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicRoutes from 'routes/PublicRoutes';
import PrivateRoute from 'routes/PrivateRoute';
import LoginPage from 'pages/auth/login/Login';
import Mainpage from 'components/layouts/main';
import useConnectWallet from 'hooks/useConnectWallet';


function App() {
  const { wallet, handleConnect, hasProvider, web3Provider } = useConnectWallet();

  const {
    auth: { isLoggedIn, user }
  } = useSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to="login" />} path="/" />
        <Route element={<LoginPage walletData={{ wallet, handleConnect, hasProvider }} />} path="/login" />

        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<Mainpage walletData={{ wallet, handleConnect, hasProvider, web3Provider }} />}>
            {PublicRoutes.map((route, index) => {
              return <Route key={index} path={route.path} element={<route.component />} />;
            })}
          </Route>
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
