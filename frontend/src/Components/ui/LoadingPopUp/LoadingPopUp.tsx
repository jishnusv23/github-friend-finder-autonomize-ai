
import { RiseLoader } from "react-spinners";
import "./LoadingPopUp.css";

const LoadingPopUp = () => {
  return (
    <div className="LoadingPopUp">
      <RiseLoader color={"#bc0202"} />
    </div>
  );
};

export default LoadingPopUp;
