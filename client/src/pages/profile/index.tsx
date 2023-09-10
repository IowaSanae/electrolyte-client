//? LIBRARY
import { useState, memo, useEffect } from 'react';
import { DatePicker } from 'react-rainbow-components';
//? APPS
import { User } from '../../types/user';
import { toast } from 'react-hot-toast';
import { Loading, Loading2 } from '../../components';
import { UpdateUser } from '../../services/user/index.services';
import { GetALLProvince, GetAllDistrictWithProvinceCode, GetAllWardWithDistrictCode } from '../../services/province/index.service';
import { ALERT_INVALID_ADDRESS, ALERT_INVALID_AVATAR, ALERT_INVALID_PHONE, ALERT_UPDATE_USER_SUCCESS } from '../../constants/msg';
import { useGetUserCurrentQuery } from '../../services/user/index.hook';
type Province = {
  code: string;
  name_with_type: string;
};

type District = {
  code: string;
  name_with_type: string;
};

type Ward = {
  code: string;
  name_with_type: string;
};
function Profile() {
  const { data: dataUserCurrent, refetch, isLoading: isLoadingUser } = useGetUserCurrentQuery();
  //? HANDLE ADDRESS
  const [payload, setPayload] = useState<User>();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [ward, setWard] = useState([]);
  const [wardCode, setWardCode] = useState();
  const [numberHouse, setNumberHouse] = useState('');
  const [provinceItem, setProvinceItem] = useState<Province>();
  const [districtItem, setDistrictItem] = useState<District>();
  const [wardItem, setWardItem] = useState<Ward>();
  const [addressDetail, setAddressDetail] = useState<string>();
  const [isUpdateAddress, setIsUpdateAddress] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | undefined | File>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataUserCurrent)
      setPayload({
        sex: dataUserCurrent?.response?.sex,
        role: dataUserCurrent?.response?.role,
        userid: dataUserCurrent?.response?.userid,
        email: dataUserCurrent?.response?.email,
        name: dataUserCurrent?.response?.name,
        address: dataUserCurrent?.response?.address,
        birthday: dataUserCurrent?.response?.birthday,
        not_new_user: dataUserCurrent?.response?.not_new_user,
        phone: dataUserCurrent?.response?.phone,
        avatar: dataUserCurrent?.response?.avatar,
      });
    setImagePreview(dataUserCurrent?.response?.avatar);
  }, [dataUserCurrent]);

  useEffect(() => {
    const fetchALLProvince = async () => {
      const response = await GetALLProvince();
      setProvince(response);
    };
    fetchALLProvince();
  }, []);

  useEffect(() => {
    const fetchDistrictWithProvinceCode = async () => {
      if (provinceCode) {
        const response = await GetAllDistrictWithProvinceCode(provinceCode);
        setDistrict(response);
      }
    };
    fetchDistrictWithProvinceCode();
  }, [provinceCode]);

  useEffect(() => {
    const fetchAllWardWithDistrictCode = () => {
      if (districtCode) {
        GetAllWardWithDistrictCode(districtCode).then((item) => setWard(item));
      }
    };
    fetchAllWardWithDistrictCode();
  }, [districtCode]);

  useEffect(() => {
    if (!isUpdateAddress) return;
    const newAddress = [numberHouse, wardItem?.name_with_type, districtItem?.name_with_type, provinceItem?.name_with_type]
      .filter(Boolean)
      .join(', ');
    setAddressDetail(newAddress);
  }, [numberHouse, wardItem, districtItem, provinceItem]);

  useEffect(() => {
    if (!isUpdateAddress) return;
    if (provinceCode) {
      const data = province.find((item: any) => item.code === provinceCode);
      if (data) setProvinceItem(data);
    }
    if (districtCode) {
      const data = district.find((item: any) => item.code === districtCode);
      if (data) setDistrictItem(data);
    }
    if (wardCode) {
      const data = ward.find((item: any) => item.code === wardCode);
      if (data) setWardItem(data);
    }
    const address = addressDetail;
    setPayload((prev: any) => {
      return {
        ...prev,
        address: address,
      };
    });
  }, [provinceCode, districtCode, wardCode, addressDetail]);

  const changeUploadImg = async (event: any) => {
    event.stopPropagation();
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setPayload((prev: any) => {
        return {
          ...prev,
          avatar: file,
        };
      });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleDate = (value: any) => {
    setPayload((prev: any) => {
      return {
        ...prev,
        birthday: value,
      };
    });
  };

  const formatDate = (time: any) => {
    const inputDate = new Date(time);
    const convertedDate = inputDate.toISOString();
    return convertedDate;
  };

  const onSubmit = () => {
    if (!payload?.address) return toast.error(ALERT_INVALID_ADDRESS);
    if (!payload?.phone) return toast.error(ALERT_INVALID_PHONE);
    if (!imagePreview) return toast.error(ALERT_INVALID_AVATAR);
    let newBirthday = formatDate(payload?.birthday);
    setPayload({
      sex: payload.sex,
      role: payload.role,
      userid: payload.userid,
      email: payload.email,
      name: payload.name,
      address: payload.address,
      birthday: newBirthday,
      not_new_user: payload.not_new_user,
      phone: payload.phone,
      avatar: payload.avatar,
    });
    onUpdateUser(payload);
  };

  const onUpdateUser = async (payload: User) => {
    try {
      setIsLoading(true);
      const response = await UpdateUser(payload);
      if (response.err === 0) {
        toast.success(ALERT_UPDATE_USER_SUCCESS);
        refetch();
      } else {
        toast.error(response.msg);
      }
    } catch (error: any) {
      toast.error(error.msg);
    } finally {
      setIsLoading(false);
      setIsUpdateAddress(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="col-lg-10 bg-white">
        <div className="p-[30px]">
          <section className="flex flex-col items-start gap-[15px] pb-[20px]" style={{ borderBottom: '.0625rem solid #efefef' }}>
            <span style={{ textTransform: 'capitalize', fontSize: '25px' }}>Hồ sơ của tôi</span>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </section>
          <>
            {isLoadingUser ? (
              <Loading2 />
            ) : (
              <div className="flex mt-[30px] gap-[30px] w-full">
                <div className="flex-1 w-full h-full">
                  <section className="">
                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Tên:</span>
                      <div className="flex items-center gap-[20px] w-full">
                        <div className="flex items-center gap-[20px] h-full w-full">
                          <input
                            placeholder={payload?.name}
                            onChange={(e) => {
                              setPayload((prev: any) => {
                                return {
                                  ...prev,
                                  name: e.target.value,
                                };
                              });
                            }}
                            disabled
                            className="w-full h-[2.5rem]  pl-[10px] rounded-[5px] outline-none"
                            type="text"
                            style={{ border: '1px solid #ccc' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Email:</span>
                      <div className="flex items-center gap-[20px] w-full">
                        <div className="flex items-center gap-[20px] h-full w-full">
                          <input
                            placeholder={payload?.email}
                            onChange={(e) => {
                              setPayload((prev: any) => {
                                return {
                                  ...prev,
                                  email: e.target.value,
                                };
                              });
                            }}
                            disabled
                            className="w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none"
                            type="text"
                            style={{ border: '1px solid #ccc' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Điện Thoại:</span>
                      <div className="flex items-center gap-[20px] w-full">
                        <div className="flex items-center gap-[20px] h-full w-full">
                          <input
                            placeholder={payload?.phone !== undefined ? payload?.phone?.toString() : undefined}
                            onChange={(e) => {
                              setPayload((prev: any) => {
                                return {
                                  ...prev,
                                  phone: e.target.value,
                                };
                              });
                            }}
                            className="w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none"
                            type="number"
                            style={{ border: '1px solid #ccc' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Giới Tính:</span>
                      <div className="flex items-center gap-[20px] w-full">
                        <div className="flex items-center gap-[20px] h-full">
                          {['Nam', 'Nữ', 'khác'].map((item: string, index: number) => (
                            <div className="flex items-center gap-[5px]" key={index}>
                              <input
                                className={`rounded-[50%] w-[18px] h-[18px] flex items-center justify-center ${payload?.sex === index ? 'border-[#1ba8ff]' : 'border-[rgba(0, 0, 0, 0.26)]'
                                  }`}
                                style={{ border: '2px solid rgba(0, 0, 0, 0.26)' }}
                                type="radio"
                                id={`gender-${index}`}
                                name="gender"
                                value={index}
                                checked={payload?.sex === index}
                                onChange={(event) => {
                                  setPayload((prev: any) => ({
                                    ...prev,
                                    sex: parseInt(event.target.value),
                                  }));
                                }}
                              />
                              <div>
                                <div>{item}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Địa chỉ:</span>
                      <div className="flex flex-col gap-[15px] w-full">
                        {!isUpdateAddress && (
                          <span onClick={() => setIsUpdateAddress(true)} className="underline text-[20px] text-[#1ba8ff] cursor-pointer">
                            Cập nhật địa chỉ
                          </span>
                        )}
                        {isUpdateAddress && (
                          <div className="w-full flex gap-[5px]">
                            <select
                              className="w-full h-[2rem] outline-none rounded-[5px]"
                              style={{ border: '1px solid #ccc' }}
                              value={provinceCode}
                              onChange={(e: any) => setProvinceCode(e.target.value)}
                            >
                              <option className="text-center">-- Chọn TP --</option>
                              {province?.map((item: any) => (
                                <option key={item._id} value={item?.code} className="text-center">
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <select
                              className="w-full h-[2rem] outline-none  rounded-[5px]"
                              style={{ border: '1px solid #ccc' }}
                              value={districtCode}
                              onChange={(e: any) => setDistrictCode(e.target.value)}
                            >
                              <option className="text-center">-- Chọn Quận --</option>
                              {district?.map((item: any) => (
                                <option key={item._id} value={item?.code} className="text-center">
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <select
                              className="w-full h-[2rem] outline-none   rounded-[5px]"
                              style={{ border: '1px solid #ccc' }}
                              value={wardCode}
                              onChange={(e: any) => setWardCode(e.target.value)}
                            >
                              <option className="text-center">-- Chọn Huyện --</option>
                              {ward?.map((item: any) => (
                                <option key={item._id} value={item?.code} className="text-center">
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <input
                              placeholder="Nhập Địa Chỉ"
                              value={numberHouse}
                              className="w-full h-[2rem] pl-[10px] rounded-[5px] outline-none"
                              onChange={(e: any) => setNumberHouse(e.target.value)}
                              type="text"
                              style={{ border: '1px solid #ccc' }}
                            />
                          </div>
                        )}

                        <input
                          placeholder={payload?.address}
                          disabled={!isUpdateAddress}
                          className="w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none"
                          type="text"
                          style={{ border: '1px solid #ccc' }}
                        />
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-[20px] pb-[30px]">
                      <span className="w-[130px] text-[1.2rem] text-end">Ngày Sinh:</span>
                      <DatePicker value={payload?.birthday} onChange={handleDate} />
                    </div>
                    <div className="text-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className="block w-[100px] h-[50px] rounded-[12px] cursor-pointer text-[1.25rem] btn btn--prinary"
                        onClick={onSubmit}
                      >
                        Lưu
                      </button>
                    </div>
                  </section>
                </div>
                <section className="flex justify-center">
                  <div className="px-[30px] flex flex-col" style={{ borderLeft: '.0625rem solid #efefef' }}>
                    <div className="rounded-[50%] bg-[#ccc] mb-[20px]  opacity-0.5 w-[150px] h-[150px] overflow-hidden inline-block">
                      {imagePreview ? (
                        <img className="w-full f-full" src={typeof imagePreview === 'string' ? imagePreview : undefined} alt="user" />
                      ) : (
                        <img className="w-full f-full" src={typeof payload?.avatar === 'string' ? payload.avatar : undefined} alt="user" />
                      )}
                    </div>
                    <button
                      className="bg-white rounded-[2px] text-[14px]"
                      style={{ border: '1px solid rgba(0,0,0,.09)', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 3%)' }}
                      onClick={changeUploadImg}
                    >
                      <label className="items-center justify-center flex h-[40px]  capitalize cursor-pointer" htmlFor="file">
                        Chọn hình ảnh
                      </label>
                      <input id="file" type="file" hidden multiple onChange={changeUploadImg} />
                    </button>
                  </div>
                </section>
                <div></div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
}
export default memo(Profile);
