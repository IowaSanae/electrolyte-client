//? LIBRARY
import './styles/index.css';
import { Toaster } from 'react-hot-toast';
import IMG from '../../assets/imgs';
//? APPS
import { Footer, HeaderNavbar } from '../../containers';
import useAuth from '../../hooks/userAuth';

export default function OrderLayout({ children }: any) {
  useAuth();
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <header className="Header">
        <div className="grid wide">
          <HeaderNavbar></HeaderNavbar>
        </div>
        <div className="cart-page-header-wrapper container-wrapper" style={{ height: "120px" }}>
          <div className="grid wide">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cart-page-header">
                <a className="cart-page-logo" href="/">
                  <div />
                  <img src={IMG.LOGO} alt="logo" style={{ width: "200px", marginTop: "15px", cursor: "pointer" }} />
                  <div className="cart-page-logo__page-name">Thanh Toán</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="header_login" style={{ borderBottom: '1px #fff solid' }}>
          <div className="header_login-logo mob:pt-[10px]">
            <img src={IMG.LOGO2} alt="logo" onClick={() => navigate('/')} />
            <span style={{ color: '#1ba8ff' }}>Thanh Toán</span>
          </div>
        </div> */}
      </header>
      {children}
      <Footer />
    </>
  );
}
