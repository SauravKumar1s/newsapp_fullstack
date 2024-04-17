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

/**
 * Documentation for SearchComponent
 *
 * Overview:
 * The `SearchComponent` is designed to provide a user interface for searching articles within the application.
 * It utilizes an input field for users to enter their search queries and a button to initiate the search. Upon
 * submission, the component fetches search results from an API and navigates to a detail page to display those results.
 *
 * State:
 * - `searchResult`: An array that stores the search results fetched from the API.
 * - `searchQuery`: A string that stores the current value entered in the search input field.
 *
 * Functions:
 * - `handleInputChange`: Updates the `searchQuery` state as the user types in the search field.
 * - `handleSearch`: Fetches search results from the API using the current `searchQuery` and navigates to the detail
 *   page with these results. It uses `fetchSearchDataApi` service to perform the API call.
 *
 * Styling:
 * The component uses Tailwind CSS classes for styling. The search input and button are styled to fit the application's
 * design theme. Adjustments to styling can be made in the `Search.styles.css` file or by modifying the Tailwind CSS classes directly.
 *
 * Usage:
 * To use the `SearchComponent` within the application, import and render it in the appropriate component, typically
 * in a header or navbar for accessibility. Ensure the `fetchSearchDataApi` function and navigation setup are correctly
 * implemented and configured to handle search functionality and results navigation.
 *
*/