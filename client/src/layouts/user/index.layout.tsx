//? LIBRARY
import './style/date.css';
import ICON from '../../assets/icons';
import { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
//? APPS
import { RootState } from '../../app/store';
import { Header, Footer } from '../../containers';
import { useAppSelector } from '../../hooks/hooks';
import useAuth from '../../hooks/userAuth';

export default function UserLayout({ children }: any) {
  useAuth();
  const { data: dataUser } = useAppSelector((state: RootState) => state.user);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="bg-[#f5f5f5]">
        <div className="grid wide">
          <div className="row pt-[150px] pb-[30px] ">
            <div className="col-lg-2">
              <div className="kul4+s">
                <div className="AmWkJQ">
                  <NavLink className="_1O4r+C" to="/user/profile">
                    <div className="electrolyte-avatar">
                      <div className="electrolyte-avatar__placeholder">
                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="electrolyte-svg-icon icon-headshot">
                          <g>
                            <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit={10} />
                            <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" strokeMiterlimit={10} />
                          </g>
                        </svg>
                      </div>
                      <img src={dataUser.avatar} alt="userImg" className="electrolyte-avatar__img" />
                    </div>
                  </NavLink>
                  <div className="miwGmI">
                    <div className="mC1Llc">{dataUser.name}</div>
                    <div>
                      <div className="_78QHr1">
                        <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                          <path
                            d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                            fill="#9B9B9B"
                            fillRule="evenodd"
                          />
                        </svg>
                        Sửa hồ sơ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-[15px]  flex-col mt-[30px]">
                <NavLink to="/user/profile" className="stardust-dropdown">
                  <div className="stardust-dropdown__item-header">
                    <div className="flex gap-[10px]">
                      <div className="bfikuD">
                        <img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" alt="profile" />
                      </div>
                      <div className="DlL0zX">
                        <span className="adF7Xs">Tài khoản của tôi</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/user/purchase" className="stardust-dropdown stardust-dropdown--open">
                  <div className="stardust-dropdown__item-header">
                    <div className="+1U02e wkLUkx flex  gap-[10px]">
                      <div className="bfikuD">
                        <img src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" alt="purchase" />
                      </div>
                      <div className="DlL0zX">
                        <span className="adF7Xs">Đơn Mua</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
