import loader from "./../../../assets/svg/loader.svg";
import './style.scss'
function Loader() {
  return (
    <div className="loader-wrapper">
      <img src={loader} className="loader-wrapper__loader" alt="" />
    </div>
  );
}

export default Loader;
