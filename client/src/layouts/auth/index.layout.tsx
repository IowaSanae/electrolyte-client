//? LIBRARY
import './style/auth.css';
import IMG from '../../assets/imgs';

import { useNavigate } from 'react-router-dom';
//? APPS
import { Footer } from '../../containers';
import { Toaster } from 'react-hot-toast';

export default function AuthALayout({ children }: any) {
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid wide">
        <header>
          <div className="header_login">
            <div className="header_login-logo mob:pt-[10px]">
              <img src={IMG.LOGO2} alt="logo" onClick={() => navigate('/')} />

            </div>

          </div>
        </header>
      </div>
      <div className="modals">
        <div className="modal__body">
          <div className="modals-logo-electrolyte hide-on-table-488 Hide-on-mobile">
            <img src={IMG.BACKGROUND} alt="logo"></img>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
