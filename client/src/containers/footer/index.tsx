
import './style/footer.css';
import { useState, memo } from 'react';
import IMG from '../../assets/imgs';
function Footer() {
  return (
    <footer className="footer">
      <div className="grid wide footer__content">
        <div className="row pt-[50px]">
          <div className="col l-6 mo-6 c-12 Footer_content">
            <h1 className="Footer_heading">VỀ CHÚNG TÔI</h1>
            <p>
              Chào mừng đến với Electrolyte - trang web bán hàng đa dạng và đáng tin cậy, mang đến cho bạn cơ hội khám phá thế giới của các sản phẩm điện tử hàng đầu.
            </p>
            <h1 className="Footer_other_heading">THÔNG TIN LIÊN HỆ</h1>
            <address>
              <p><i className="fa-solid fa-address-book fa-footer"></i>&nbsp; 19 Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, Tp.HCM</p>
              <p><i className="fa-solid fa-phone fa-footer"></i>&nbsp; 0858124230</p>
              <p><i className="fa-solid fa-envelope fa-footer"></i>&nbsp; dobao1309@gmail.com</p>
            </address>
            <hr className="solid"></hr>
            <img src={IMG.LEGIT} alt="logo" style={{ width: "200px" }} />
          </div>
          <div className="col l-6 mo-6 c-12 Footer_content">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15680.09409839823!2d106.6997696!3d10.7326689!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b2747a81a3%3A0x33c1813055acb613!2sTon%20Duc%20Thang%20University!5e0!3m2!1sen!2s!4v1693307390129!5m2!1sen!2s"
              className="Footer-map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="Footer__bottom">
        <div className="grid wide">
          <p className="Footer__text">@2023 Electrolyte</p>
        </div>
      </div>
    </footer>
  );
}
export default memo(Footer);
