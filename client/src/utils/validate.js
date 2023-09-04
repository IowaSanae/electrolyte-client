import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

export const validateLogin = (email, passWord, setValidationMsg) => {
  const msg = {};
  if (isEmpty(email)) {
    msg.emailLogin = 'Xin hãy nhập email';
  } else if (!isEmail(email)) {
    msg.emailLogin = 'Email không hợp lệ';
  }
  if (isEmpty(passWord)) {
    msg.passWordLogin = 'Xin hãy nhập mật khẩu';
  }

  setValidationMsg(msg);
  return Object.keys(msg).length <= 0;
};
// kiểm tra dữ liệu đăng ký
export const validateRegister = (name, email, passWord, setValidationMsg) => {
  const msg = {};
  if (isEmpty(name)) {
    msg.nameRegister = 'Xin hãy nhập tên';
  }
  if (isEmpty(email)) {
    msg.emailRegister = 'Xin hãy nhập email';
  } else if (!isEmail(email)) {
    msg.emailRegister = 'Email không hợp lệ';
  }
  if (isEmpty(passWord)) {
    msg.passWordRegister = 'Xin hãy nhập mật khẩu';
  }
  setValidationMsg(msg);
  return Object.keys(msg).length <= 0;
};

export const validateForgotPassword = (email, setValidationMsg) => {
  const msg = {};
  if (isEmpty(email)) {
    msg.emailLogin = 'Xin hãy nhập email';
  } else if (!isEmail(email)) {
    msg.emailLogin = 'Email không hợp lệ';
  }

  setValidationMsg(msg);
  return Object.keys(msg).length <= 0;
};

export const validateResetPassword = (passWord, setValidationMsg) => {
  const msg = {};
  if (isEmpty(passWord)) {
    msg.passWord = 'Xin hãy nhập mật khẩu';
  }

  setValidationMsg(msg);
  return Object.keys(msg).length <= 0;
};
