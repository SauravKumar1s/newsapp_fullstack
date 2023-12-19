import React from "react";
import { useDispatch } from "react-redux";
import { removeFromHistory } from "../../../constants/historylist/historySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

interface HistoryChecksProps {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

const HistoryChecks: React.FC<HistoryChecksProps> = ({
  id,
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();

  const removeHistoryItemHandler = (historyItemId: string) => {
    dispatch(removeFromHistory(historyItemId));
    toast.success("Removed from History", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode bg-white"}>
      <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl">
        <div>
          <ToastContainer />
        </div>
        <img
          className="w-full rounded-t-lg h-96 mx-2 my-1 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={imageUrl}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <p className="mb-3 font-bold text-gray-500">{lastUpdated}</p>
          <a
            href={url}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
          <p className="mb-3 font-bold text-gray-700">{source}</p>
          <div className="flex flex-row items-center py-1">
            <button
              onClick={() => removeHistoryItemHandler(imageUrl)}
              className="text-rose-600"
            >
              Remove from History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryChecks;
