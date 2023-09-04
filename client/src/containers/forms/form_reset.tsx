//? LIBRARY
import { useState, memo, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
//? APPS
import { validateResetPassword } from '../../utils/validate';
import { Loading } from '../../components';
import { useMutationResetPassWord } from '../../services/auth/index.hook';

function ResetForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [passWord, SetPassWord] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationMsg, setValidationMsg] = useState<any>({});
  const [payload, setPayload] = useState({
    token: params.token,
    email: params.email,
    password: passWord,
  });

  const { loading, refetch } = useMutationResetPassWord(payload);

  useEffect(() => {
    setPayload(() => {
      return {
        token: params.token,
        email: params.email,
        password: passWord,
      };
    });
  }, [params, passWord]);

  const onResetPassWord = async () => {
    const isValid = await validateResetPassword(passWord, setValidationMsg);
    if (!isValid) return;
    refetch();
  };
  const handelKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onResetPassWord();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="auth-form" style={{ height: "220px" }}>
        <div className="auth-form__container">
          <div className="auth-form__header">
            <h3 className="auth-form__heading">Nhập mật khẩu mới</h3>
          </div>
          <div className="auth-form__form">
            <div className="auth-form__group">
              <div className="password-input">
                <input
                  value={passWord}
                  onChange={(e) => SetPassWord(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới của bạn"
                  className="auth-form__input"
                  onKeyDown={handelKeyDown}
                />
                <span className="password-toggle-icon d-flex" onClick={togglePasswordVisibility} style={{ justifyContent: "flex-end", marginTop: "-28px", marginRight: "10px", color: "rgb(27, 168, 255)", cursor: 'pointer' }}>
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
                <span className="error" style={{ paddingTop: "13px", display: "flex", color: "red" }}>{validationMsg.passWord}</span>
              </div>
            </div>
          </div>
          <div className="auth-form__controls">

            <button className="btn login_btn" onClick={onResetPassWord}>
              Cập nhật
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
export default memo(ResetForm);
