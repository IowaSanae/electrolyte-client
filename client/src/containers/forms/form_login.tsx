import React, { useState, memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { validateLogin } from '../../utils/validate';
import { useMutationLogin } from '../../services/auth/index.hook';
import { Loading } from '../../components';

function LoginForm() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passWordLogin, SetPassWordLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationMsg, setValidationMsg] = useState<any>({});
  const [payload, setPayload] = useState({
    email: emailLogin,
    password: passWordLogin,
  });
  const { loading, refetch } = useMutationLogin(payload);

  useEffect(() => {
    setPayload(() => {
      return {
        email: emailLogin,
        password: passWordLogin,
      };
    });
  }, [emailLogin, passWordLogin]);

  const onLogin = async () => {
    const isValid = await validateLogin(emailLogin, passWordLogin, setValidationMsg);
    if (!isValid) return;
    refetch();
  };

  const handelKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="auth-form">
        <div className="auth-form__container">
          <div className="auth-form__header">
            <h1 className="auth-form__heading">Đăng Nhập</h1>
          </div>
          <div className="auth-form__form">
            <div className="auth-form__group">
              <input
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                type="text"
                placeholder="Nhập email"
                className="auth-form__input"
                onKeyDown={handelKeyDown}
              />
              <span className="error" style={{color: "red"}}>{validationMsg.emailLogin}</span>
            </div>
            <div className="auth-form__group">
              <div className="password-input">
                <input
                  value={passWordLogin}
                  onChange={(e) => SetPassWordLogin(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  className="auth-form__input"
                  onKeyDown={handelKeyDown}
                />
                <span className="password-toggle-icon d-flex" onClick={togglePasswordVisibility} style={{ justifyContent: "flex-end", marginTop: "-28px", marginRight: "10px", marginBottom: "15px", color: "rgb(27, 168, 255)", cursor: 'pointer' }}>
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
                <span className="error" style={{color: "red"}}>{validationMsg.passWordLogin}</span>
              </div>
            </div>
          </div>
          <div className="auth-form-help">
            <NavLink to="/forgotPassword" className="auth-form__help-forgot">
              Quên mật khẩu
            </NavLink>
          </div>
          <div className="auth-form__controls">
            <button className="btn login_btn" onClick={onLogin}>
              Đăng nhập
            </button>
          </div>
          <div className='register_section'>
            <p>Chưa có tài khoản?&nbsp;</p>
            <NavLink to="/register" className="auth-form__switch-btn">
              Đăng ký ngay!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(LoginForm);
