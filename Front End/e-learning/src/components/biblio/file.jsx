import "./file.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faHeart as faHeartFilled,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import MyContext from "../../context/myContext";

const File = ({ file, addToDownloadedFiles }) => {
  function handleDownload() {
    addToDownloadedFiles(file);
    toast("File " + file.title + " Downloaded!");
  }
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <ToastContainer />
      <div className="file">
        <div className="imagePreview">
          <img src="/pdf.png" alt="pdf icon" height={"80px"} />
        </div>
        <div className="namePreview">
          <span>{file.title}</span>
          <span>
            <FontAwesomeIcon
              icon={isLiked ? faHeartFilled : faHeartEmpty}
              className="download"
              onClick={handleLike}
              style={{ margin: "0 5px" }}
            />
            <FontAwesomeIcon
              icon={faDownload}
              className="download"
              onClick={handleDownload}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default File;
