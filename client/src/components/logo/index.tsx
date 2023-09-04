//? LIBRARY
import { NavLink } from 'react-router-dom';

import svg from '../../assets/svgs';
function ElectrolyteLogo() {
  return (
    <NavLink className="Header__logo Hide-on-mobile" to="/">
      <div className="w-full">{svg.ELECTROLYTELOGO}</div>
    </NavLink>
  );
}
export default ElectrolyteLogo;
