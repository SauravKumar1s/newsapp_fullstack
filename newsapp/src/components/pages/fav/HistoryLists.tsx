// HistoryLists.tsx
import { useSelector } from "react-redux";
import HistoryChecks from "./HistoryCheck";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

const HistoryLists = () => {
  // Retrieve data from the Redux store
  const { historyItems } = useSelector((state) => state.historylists) || { historyItems: [] };

  const { isDarkMode } = useDarkMode();

  // Sort historyItems based on lastUpdated timestamp
  const sortedHistoryItems = historyItems.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return dateB - dateA; // Sort in descending order (latest first)
  });

  return (
    <div className={isDarkMode ? "dark-mode text-white" : "light-mode bg-white"}>
      <div className="">
        <div className="container mx-auto px-2 py-3">
          <h1 className="text-4xl text-center py-5">My History</h1>
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center">
            {sortedHistoryItems.map((historyItem) => (
              <HistoryChecks key={historyItem.id} {...historyItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryLists;
