import { toast } from 'react-hot-toast';
import config from '../../configs/configAxios';

export const ApiRegister = async (payload: any) => {
  try {
    const response = await config({
      method: 'post',
      url: `/auth/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        name: payload.name,
        password: payload.password,
        email: payload.email,
        phone: '090',
      }),
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.msg);
  }
};

export const ApiLogin = async (payload: any) => {
  try {
    const response = await config({
      method: 'post',
      url: `/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.msg);
  }
};

export const ApiForgotPassword = async (payload: any) => {
  try {
    const token = localStorage.getItem('token-electrolyte');
    const response = await config({
      method: 'post',
      url: `/auth/forgotPassword?email=${payload.email}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.msg);
  }
};

export const ApiResetPassword = async (payload: any) => {
  try {
    const response = await config({
      method: 'put',
      url: `/auth/resetPassword`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: payload.email,
        password: payload.password,
        token: payload.token,
      }),
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.msg);
  }
};

export const ApiLogout = async () => {
  try {
    const token = localStorage.getItem('token-electrolyte');
    // const refreshToken = getCookie();
    localStorage.removeItem('token-electrolyte');
    const response = await config({
      method: 'get',
      url: `/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.msg);
  }
};
