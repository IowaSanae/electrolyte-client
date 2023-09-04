//? LIBRARY
import { useState, memo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//? APPS
import { validateForgotPassword } from '../../utils/validate';
import { Loading } from '../../components';
import { useMutationForgotPassWord } from '../../services/auth/index.hook';
import { shouldProcessLinkClick } from 'react-router-dom/dist/dom';

function ForgotForm() {
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState('');
  const [validationMsg, setValidationMsg] = useState<any>({});
  const [payload, setPayload] = useState({
    email: emailLogin,
  });
  const { loading, refetch } = useMutationForgotPassWord(payload);

  useEffect(() => {
    setPayload(() => {
      return {
        email: emailLogin,
      };
    });
  }, [emailLogin]);

  const onLogin = async () => {
    const isValid = await validateForgotPassword(emailLogin, setValidationMsg);
    if (!isValid) return;
    refetch();
  };

  const handelKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="auth-form" style={{height: "220px"}}>
        <div className="auth-form__container">
          <div className="auth-form__header">
            <h3 className="auth-form__heading">Quên mật khẩu</h3>
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
          </div>
          <div className="auth-form__controls">
            <button className="btn login_btn" onClick={onLogin}>
              Xác nhận
            </button>
                &nbsp;
            <button className="btn auth-form__controls-back btn--normal" onClick={() => navigate('/login')}>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(ForgotForm);
