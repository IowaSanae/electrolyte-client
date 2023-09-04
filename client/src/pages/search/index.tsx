//? LIBRARY
import { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//? APPS
import { ProductList, Pagination, SearchFilter } from '../../containers';
import { Loading, SearchEmpty } from '../../components';
import { useSearchProductQuery } from '../../services/post/index.hook';

function Search() {
  const params = useParams();
  const [payload, setPayload] = useState({
    params: params,
    limit: 50,
    page: 1,
  });
  const [totalPage, setTotalPage] = useState(10);
  const { data, isLoading } = useSearchProductQuery(payload);

  useEffect(() => {
    data?.totalPage && setTotalPage(data?.totalPage);
  }, [data, payload]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data === null ? (
            <Loading />
          ) : (
            <>
              {data === null ? (
                <SearchEmpty />
              ) : (
                <div className="row sm-gutter py-[30px]">
                  <div className="col l-2 col-sm-3 c-3 Hide-on-mobile">
                    <SearchFilter />
                  </div>
                  <div className="col l-10">
                    <div className="padding-search mob:pt-[50px] mob:hidden block"></div>
                    <ProductList items={data?.response?.rows || []} col={'col l-2-4 mo-4 c-6'} loading={isLoading} />
                    <Pagination setPayload={setPayload} totalPage={totalPage} />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
export default memo(Search);
