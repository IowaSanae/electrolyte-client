//? LIBRARY
import { toast } from 'react-hot-toast';
import { Order } from '../../types/order';
import './styles/index.css';
import { memo, useState } from 'react';
import { Rating } from 'react-rainbow-components';
import { CreateComment } from '../../services/comment/index.service';
import { Loading } from '../../components';
//? APPS

interface RatingModel {
  isShow: boolean;
  onCloseModel: any;
  data: Order;
}

function ModelRatting({ isShow, onCloseModel, data }: RatingModel) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [payLoad, setPayload] = useState<any>({
    comment: '',
    rating_star: 5,
  });

  const onFileChange = (event: any) => {
    const files = event.target.files;
    if (files.length + imageUrls.length > 5) {
      toast.error('Bạn chỉ được tải tối đa 5 ảnh');
      event.target.value = '';
      return;
    }
    const newImages: string[] = [];
    const newFiles: any[] = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      const imageURL: string = URL.createObjectURL(file);
      newImages.push(imageURL);
      newFiles.push(file);
    }

    setImageUrls((prevImageUrls) => [...prevImageUrls, ...newImages]);
    setFileImages((prev: any) => [...prev, ...newFiles]);
  };
  const onRemoveFile = (index: number) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const onSubmit = () => {
    if (!payLoad.comment) return toast.error('Vui lòng nhập nhận xét của bạn');
    if (imageUrls?.length === 0) return toast.error('Vui lòng cập nhật hình ảnh');
    const payloadCreateComment = data?.posts?.map((payload: any, index: number) => {
      return {
        itemid: payload.itemid,
        shopid: data.shopid,
        orderid: data.orderid,
        images: fileImages,
        options: data?.option[index],
        model_name: '',
        comment: payLoad?.comment,
        rating_star: payLoad?.rating_star,
      };
    });
    onCreateComment(payloadCreateComment);
  };

  const onCreateComment = async (payload: any) => {
    try {
      setLoading(true);
      for (const item of payload) {
        const response = await CreateComment(item);
        if (response.err === 0) {
          onCloseModel();
          toast.success('Bạn vừa thêm bình luận');
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      onCloseModel();
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      {isShow && (
        <div id="modal">
          <div>
            <div className="electrolyte-popup electrolyte-modal__transition-enter-done">
              <div className="electrolyte-popup__overlay" onClick={onCloseModel} />
              <div className="electrolyte-popup__container">
                <div style={{ display: 'contents' }}>
                  <div>
                    <div className="electrolyte-popup-form OU2Nj+">
                      <div className="electrolyte-popup-form__header">
                        <div className="electrolyte-popup-form__title">Đánh giá sản phẩm</div>
                      </div>
                      <div className="electrolyte-popup-form__main">
                        <div className="electrolyte-popup-form__main-container">
                          <div className="rating-modal-handler__container rating-modal-handler__container--last">
                            {data?.posts?.map((post: any, index: number) => (
                              <div className="product_info_rating_container rating_container" key={post?.itemid}>
                                <div className="order_product_name">
                                  <div className="electrolyte-image__wrapper">
                                    <div className="shopping_cart-img">
                                      <img src={post?.image} alt={post?.name} />
                                    </div>
                                    <div
                                      className="electrolyte-image__content"
                                      style={{
                                        backgroundImage: `${post?.image}`,
                                      }}
                                    >
                                      <div className="electrolyte-image__content--blur"> </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="product_name_rating_container">
                                  <div className="product_name_rating">{post?.name}</div>
                                  <div className="product_type_rating">Phân loại hàng: {data?.option[index]}</div>
                                </div>
                              </div>
                            ))}

                            <div style={{ margin: '20px 0px' }}>
                              <div className="star_rating_container">
                                <div className="quality_title">
                                  <span>Chất lượng sản phẩm</span>
                                </div>
                                <div className="rainbow-m-around_big">
                                  <Rating
                                    value={payLoad.rating_star}
                                    onChange={(e: any) =>
                                      setPayload((prev: any) => {
                                        return {
                                          ...prev,
                                          rating_star: +e.target.value,
                                        };
                                      })
                                    }
                                  />
                                </div>
                                <span className="quality_level" style={{ color: 'rgba(255,204,0,1)' }}>
                                  {['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'][payLoad?.rating_star - 1]}
                                </span>
                              </div>
                            </div>
                            <div className="rating_maincontainer">
                              <div className="rating_subcontainer">
                                <div className="rating_content_container">
                                  <div className="rating_category" style={{ fontWeight: 'normal' }}>
                                    Tiêu đề đánh giá:
                                  </div>
                                  <textarea className="rating_description" rows={1} placeholder="Hãy nhập gì đó ở đây." defaultValue={''} />
                                </div>
                                <div className="rating_content_container">
                                  <div className="rating_category" style={{ fontWeight: 'normal' }}>
                                    Mô tả:
                                  </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                  <textarea
                                    className="rating_description"
                                    rows={3}
                                    placeholder="Hãy nhập gì đó ở đây."
                                    style={{
                                      minHeight: 100,
                                      color: 'rgba(0, 0, 0, 0.87)',
                                    }}
                                    value={payLoad.comment}
                                    onChange={(e: any) =>
                                      setPayload((prev: any) => {
                                        return {
                                          ...prev,
                                          comment: e.target.value,
                                        };
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              {imageUrls.length === 0 && (
                                <div className="rating_add_image_container">
                                  <label className="rating_add_image_button">
                                    <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.15377 9.76895C6.15377 11.8927 7.87492 13.6151 9.99992 13.6151C12.1236 13.6151 13.8461 11.8927 13.8461 9.76895C13.8461 7.6446 12.1236 5.9228 9.99992 5.9228C7.87492 5.9228 6.15377 7.6446 6.15377 9.76895ZM5 9.76896C5 7.00771 7.23813 4.76896 10 4.76896C12.7613 4.76896 15 7.00771 15 9.76896C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76896ZM1.15385 17.2606C0.489784 17.2606 0 16.7249 0 16.0662V4.12218C0 3.46224 0.489784 2.8459 1.15385 2.8459H4.61538L5.21635 1.73267C5.21635 1.73267 5.75421 0.538208 6.41827 0.538208H13.5817C14.2452 0.538208 14.7837 1.73267 14.7837 1.73267L15.3846 2.8459H18.8462C19.5096 2.8459 20 3.46224 20 4.12218V16.0662C20 16.7249 19.5096 17.2606 18.8462 17.2606H1.15385Z"
                                        fill="#1ba8ff"
                                      />
                                    </svg>
                                    <span className="rating_add_image_title">Thêm Hình ảnh</span>
                                    <input className="add_image_file_button" type="file" accept="image/*" multiple onChange={onFileChange} />
                                  </label>
                                </div>
                              )}

                              <div className="rating_add_image_container">
                                {imageUrls?.map((url, index) => (
                                  <div
                                    key={index}
                                    className="image_added"
                                    style={{
                                      backgroundImage: `url('${url}')`,
                                      border: 'none',
                                    }}
                                  >
                                    <button>
                                      <svg width={10} height={10} viewBox="0 0 10 10" fill="none" onClick={() => onRemoveFile(index)}>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.28268 0.908882C8.47794 0.71362 8.79452 0.71362 8.98978 0.908882L9.0908 1.0099C9.28606 1.20516 9.28606 1.52174 9.0908 1.717L1.71669 9.09112C1.52142 9.28638 1.20484 9.28638 1.00958 9.09112L0.908564 8.9901C0.713301 8.79484 0.713301 8.47826 0.908563 8.283L8.28268 0.908882Z"
                                          fill="#F6F6F6"
                                        />
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M1.00973 0.908882C1.20499 0.71362 1.52157 0.71362 1.71683 0.908882L9.09095 8.28299C9.28621 8.47826 9.28621 8.79484 9.09095 8.9901L8.98993 9.09112C8.79467 9.28638 8.47809 9.28638 8.28283 9.09112L0.908713 1.717C0.713451 1.52174 0.71345 1.20516 0.908713 1.0099L1.00973 0.908882Z"
                                          fill="#F6F6F6"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ))}

                                {imageUrls.length > 0 && (
                                  <>
                                    {Array.from({ length: 5 }).map((_, index: number) => (
                                      <>
                                        {index < 5 - imageUrls.length && (
                                          <label className="add_multiple_image_container" key={index}>
                                            <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
                                              <svg width={20} height={18} viewBox="0 0 20 18" fill="none">
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M6.15377 9.76902C6.15377 11.8927 7.87492 13.6152 9.99992 13.6152C12.1236 13.6152 13.8461 11.8927 13.8461 9.76902C13.8461 7.64466 12.1236 5.92286 9.99992 5.92286C7.87492 5.92286 6.15377 7.64466 6.15377 9.76902ZM5 9.76902C5 7.00777 7.23813 4.76902 10 4.76902C12.7613 4.76902 15 7.00777 15 9.76902C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76902ZM1.15385 17.2607C0.489784 17.2607 0 16.725 0 16.0662V4.12224C0 3.4623 0.489784 2.84596 1.15385 2.84596H4.61538L5.21635 1.73273C5.21635 1.73273 5.75421 0.538269 6.41827 0.538269H13.5817C14.2452 0.538269 14.7837 1.73273 14.7837 1.73273L15.3846 2.84596H18.8462C19.5096 2.84596 20 3.4623 20 4.12224V16.0662C20 16.725 19.5096 17.2607 18.8462 17.2607H1.15385Z"
                                                  fill="black"
                                                  fillOpacity="0.26"
                                                />
                                              </svg>
                                            </svg>
                                            <input className="add_image_file_button" type="file" accept="image/*" multiple onChange={onFileChange} />
                                          </label>
                                        )}
                                      </>
                                    ))}
                                  </>
                                )}
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="electrolyte-popup-form__footer">
                        <button type="button" className="btn btn-solid-primary btn--s btn--inline rL4kG2" onClick={onSubmit}>
                          Hoàn thành
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style
            id="modal-inset"
            data-top={0}
            data-right={0}
            data-bottom={0}
            data-left={0}
            dangerouslySetInnerHTML={{
              __html: '.modal-inset{top:0;right:0;bottom:0;left:0;position:fixed;pointer-events:none}.modal-inset>*{pointer-events:auto}',
            }}
          />
        </div>
      )}
    </>
  );
}
export default memo(ModelRatting);
