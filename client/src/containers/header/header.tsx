//? LIBRARY
import './style/header.css';
import './style/Header_Navbar.css';
import './style/Header_Cart-List.css';
import { memo } from 'react';
//? APPS
import { HeaderNavbar, HeaderWithSearch } from '../index';

function Header() {
  return (
    <header className="Header">
      <div className="grid wide  flex-col justify-between  h-full" style={{ display: 'flex' }}>
        <HeaderNavbar />
        <HeaderWithSearch />
      </div>
    </header>
  );
}
export default memo(Header);
