//? LIBRARY
import IMG from '../../assets/imgs';
function PageNotFound() {
  return (
    <div className="flex justify-center items-center">
      <img src={IMG.PAGE_NOT_FOUND_IMG} alt="PageNotFoundImg" className="w-full" />
    </div>
  );
}
export default PageNotFound;
