//? LIBRARY
import { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
//? APPS
import { validateRegister } from '../../utils/validate';
import { Loading } from '../../components';
import { useMutationRegister } from '../../services/auth/index.hook';

function RegisterForm() {
  const [validationMsg, setValidationMsg] = useState<any>({});
  const [nameRegister, setNameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passWordRegister, SetPassWordRegister] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    name: nameRegister,
    password: passWordRegister,
    email: emailRegister,
  });

  const { refetch, loading } = useMutationRegister(payload);

  useEffect(() => {
    setPayload(() => {
      return {
        name: nameRegister,
        password: passWordRegister,
        email: emailRegister,
      };
    });
  }, [nameRegister, passWordRegister, emailRegister]);

  const onRegister = async () => {
    const isValid = await validateRegister(nameRegister, emailRegister, passWordRegister, setValidationMsg);
    if (!isValid) return;
    refetch();
  };

  const handelKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onRegister();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <Loading />}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="auth-form" style={{ height: "420px" }}>
        <div className="auth-form__container">
          <div className="auth-form__header">
            <h3 className="auth-form__heading">Đăng Ký</h3>
          </div>
          <div className="auth-form__form">
            <div className="auth-form__group">
              <input
                value={nameRegister}
                onChange={(e) => setNameRegister(e.target.value)}
                type="text"
                required
                placeholder="Nhập tên"
                className="auth-form__input"
                onKeyDown={handelKeyDown}
              />
              <span className="error" style={{color: "red"}}>{validationMsg.nameRegister}</span>
            </div>
            <div className="auth-form__group">
              <input
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
                type="text"
                placeholder="Nhập email"
                className="auth-form__input"
                onKeyDown={handelKeyDown}
              />
              <span className="error" style={{color: "red"}}>{validationMsg.emailRegister}</span>
            </div>
            <div className="auth-form__group">
              <div className="password-input">
                <input
                  value={passWordRegister}
                  onChange={(e) => SetPassWordRegister(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  className="auth-form__input"
                  onKeyDown={handelKeyDown}
                />
                <span className="password-toggle-icon d-flex" onClick={togglePasswordVisibility} style={{ justifyContent: "flex-end", marginTop: "-28px", marginRight: "10px", marginBottom: "15px", color: "rgb(27, 168, 255)", cursor: "pointer" }}>
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
                <span className="error" style={{color: "red"}}>{validationMsg.passWordRegister}</span>
              </div>
            </div>
          </div>
          <div className="auth-form__controls">
            <button className="btn login_btn" onClick={onRegister}>
              ĐĂNG KÝ
            </button>
          </div>
          <div className='register_section'>
            <p>Đã có tài khoản?&nbsp;</p>
            <NavLink to="/login" className="auth-form__switch-btn">
              Đăng nhập ngay!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(RegisterForm);
