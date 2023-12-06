import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSearchDataApi } from "../../../services/api";
import "./Search.styles.css";
export const SearchComponent = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetchSearchDataApi(searchQuery);
      setSearchResult(response?.data?.articles);

      const category = {
        title: `Search Results found - ${searchQuery}`,
        data: response?.data?.articles,
      };
      navigate("/detail/search", { state: { category } });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex items-center">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button className="px-4 text-white bg-purple-600 rounded-full " 
          onClick={handleSearch}
                
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>

  );
};
