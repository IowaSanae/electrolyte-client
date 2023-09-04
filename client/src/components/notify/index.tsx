//? LIBRARY
import { NavLink } from 'react-router-dom';
//? APPS
import { Notification } from '../../types/notifycation';
interface HeaderNotifyModel {
  data: Notification[];
}

function HeaderNotify({ data }: HeaderNotifyModel) {
  const isSeen: string = `Header_notify-item Header_notify-item--viewed bg-[#f7f7f7]`;
  const noSeen: string = `Header_notify-item Header_notify-item--viewed`;

  return (
    <div className="Header_notify">
      <header className="Header_notify-header">
        <h3> Thông báo mới nhận </h3>
      </header>
      <ul className="Header_notify-list">
        {data?.map((item: Notification) => {
          return (
            <li className={item.seen ? isSeen : noSeen} key={item.id}>
              <NavLink to="# " className="Header_notify-link">
                <div className="Header_notify-infor">
                  <span className="Header_notify-name">{item.title}</span>
                  <span className="Header_notify-description">{item.content}</span>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <footer className="Header__notify-footer">
        <NavLink to="#" className="Header__notify-btn">
          Xem tất cả
        </NavLink>
      </footer>
    </div>
  );
}
export default HeaderNotify;
