import axios from 'axios';
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
    if (error.response && error.response.status === 500 && error.err === -1) {
      toast.error(error.mes.toString());
    }
    if (error.response && error.response.status === 404 && error.err === -1) {
      toast.error(error.mes.toString());
    }
    return Promise.reject(error);
  }
);
export default instance;
