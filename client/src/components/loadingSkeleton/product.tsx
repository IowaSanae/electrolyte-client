import { LoadingSkeleton } from '../index';

function SkeletonProduct() {
  return (
    <div className="Home-product-item">
      <LoadingSkeleton className="w-full h-[155px]"></LoadingSkeleton>
      <h4 className="Home-product-item-name mx-[10px] my-[8px]">
        <LoadingSkeleton className="w-full h-[26px]"></LoadingSkeleton>
      </h4>
      <div className="Home-product-item_price gap-[10px] mx-[10px]">
        <LoadingSkeleton className="w-[50%] h-[16px]"></LoadingSkeleton>
        <LoadingSkeleton className="w-[50%] h-[16px]"></LoadingSkeleton>
      </div>
      <div className="Home-product-item_actiton mx-[10px]">
        <LoadingSkeleton className="w-full h-[16px] mb-[5px]"></LoadingSkeleton>
      </div>
    </div>
  );
}
export default SkeletonProduct;
