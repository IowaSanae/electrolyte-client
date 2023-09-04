import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserActions } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../services/user/index.services';
import { User } from '../types/user';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token-electrolyte');
  const [dataUser, setDataUser] = useState<User>();

  useEffect(() => {
    const fetchDataCurrentUser = async () => {
      if (token) {
        try {
          const response = await GetCurrentUser();
          if (response.err === 0) {
            setDataUser(response.response);
            dispatch(UserActions.updateUser({ data: response.response, isLogin: true }));
          } else {
            toast.error(response.msg);
          }
        } catch (error: any) {}
      } else {
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    fetchDataCurrentUser();
  }, [token, dispatch, navigate]);

  return { dataUser };
};

export default useAuth;
