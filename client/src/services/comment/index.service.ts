import { toast } from 'react-hot-toast';
import config from '../../configs/configAxios';

export const CreateComment = async (payload: any) => {
  try {
    const token = localStorage.getItem('token-electrolyte');
    let data = new FormData();
    data.append('orderid', payload?.orderid);
    data.append('itemid', payload?.itemid);
    data.append('shopid', payload?.shopid);
    data.append('comment', payload?.comment);
    data.append('rating_star', payload?.rating_star);
    for (const img of payload?.images) {
      data.append('images', img);
    }
    data.append('model_name', payload?.model_name);
    data.append('options', payload?.options);
    console.log(data, 'data');
    const response = await config({
      method: 'post',
      url: 'comment',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });

    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.msg);
  }
};
