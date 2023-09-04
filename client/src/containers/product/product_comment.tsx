//? LIBRARY
import IMG from '../../assets/imgs';
import ICON from '../../assets/icons';
import { useEffect, useState } from 'react';
//? APPS
import { Comment } from '../../types/comment';
import { formatTime } from '../../utils/generateTime';
import { generateStart } from '../../utils/generateStart';
import { useParams } from 'react-router-dom';
import { useGetCommentsQuery } from '../../services/comment/index.hook';
import { Rating } from 'react-rainbow-components';

function ProductComment() {
  const params = useParams();
  const [data, setData] = useState<Comment[]>([]);
  const { data: dataComments } = useGetCommentsQuery(params);

  useEffect(() => {
    dataComments?.response && setData(dataComments?.response || []);
  }, [dataComments]);

  return (
    <div className="wrapper">
      <div className="productDes_inner">
        <p className="product-comment-heading">ĐÁNH GIÁ SẢN PHẨM</p>
        {data?.length > 0 ? (
          data?.map((item: Comment, index: number) => {
            return (
              <div className="product-comment-content" key={index}>
                <div className="product-comment-avatar">
                  <img src={item?.author_portrait} alt="item" />
                </div>
                <div className="product-comment-main">
                  <>
                    <h3>{item?.author_username}</h3>
                    <div>
                      <div className="rainbow-m-around_small flex">
                        <Rating value={item.rating_star} readOnly />
                      </div>
                    </div>
                    <div className="product-items-content-rating-icons"></div>
                    {formatTime(item?.createdAt)}
                    <p>{item?.comment}</p>
                    <CommentItem item={item} />
                    {item?.comment_rep === null ? null : (
                      <div className="comment-main-shop-feedback">
                        <h3>Phản hồi của chúng tôi</h3>
                        <p>{item?.comment_rep?.comment}</p>
                      </div>
                    )}
                  </>
                </div>
              </div>
            );
          })
        ) : (
          <div className="product-comment-empty">
            <div className="product-comment-empty-img">
              <img src={IMG.EMPTY_COMMENT} alt="emptyComment"></img>
            </div>
            <p className="product-comment-empty-des">Chưa có bình luận nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentItem({ item }: any) {
  const [ShowImg, setShowImg] = useState(false);
  const [ShowVideo, setShowVideo] = useState(false);

  const [imgActive, setImgActive] = useState('');
  return (
    <div className="comment-rating">
      <div className="w-full">
        <div className="comment-rating">
          {item?.cover && (
            <div
              className="comment-video"
              onClick={() => {
                if (ShowImg) {
                  setShowImg(false);
                }
                setShowVideo(true);
              }}
              onDoubleClick={() => setShowVideo(false)}
            >
              {ICON.VIDEO}
              <img src={item?.cover} alt="" />
            </div>
          )}

          {item?.images?.map((img: any, index_img: any) => {
            return (
              <div className="comment-rating-img" key={index_img} onClick={() => setImgActive(item?.images[index_img])}>
                <img
                  src={img}
                  alt="item"
                  onClick={() => {
                    if (ShowVideo) {
                      setShowVideo(false);
                    }
                    setShowImg(true);
                  }}
                  onDoubleClick={() => setShowImg(false)}
                />
              </div>
            );
          })}
        </div>
        {ShowVideo && (
          <div className="comment-rating-img-video">
            <video src={item?.videos} controls autoPlay />
          </div>
        )}
        {ShowImg && item?.images && (
          <div className="comment-rating-show-img">
            <img src={imgActive} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductComment;