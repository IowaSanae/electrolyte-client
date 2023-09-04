//? LIBRARY
import './style/daily.css';
import { memo, useState } from 'react';
//? APPS

import { ProductList, Pagination } from '../../containers';
import { useGetProductsQuery } from '../../services/post/index.hook';
import Loading from '../../components/loading';

function Daily() {
  const [payload, setPayload] = useState({
    limit: 100,
    page: 1,
  });
  const { data, isLoading } = useGetProductsQuery(payload);

  return (
    <div className="bg-[#f5f5f5] overflow-hidden mt-[120px]">
      <div className="grid wide">
        <div className="row sm-gutter">
          <div className="col l-12 mo-12 c-12">
            <div className="flex h-[3.5rem] relative">
              <h1 className="all_products">Tất cả sản phẩm</h1>
            </div>
            <ProductList items={data?.response?.rows || []} col={'col l-2-4 mo-4 c-6'} loading={isLoading} />
            {isLoading ? <Loading /> : <Pagination setPayload={setPayload} totalPage={data?.totalPage} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Daily);
