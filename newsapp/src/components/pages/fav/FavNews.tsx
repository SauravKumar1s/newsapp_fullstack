// Importing the useSelector hook from 'react-redux' to access the Redux store state.
import { useSelector } from "react-redux";
// Importing the Wish component, which will be used to render each wishlist item.
import Wish from "./Wish";
// Importing the useDarkMode custom hook to toggle between dark and light themes.
import { useDarkMode } from "../../organisms/context/DarkModeContext";

const FavNews = () => {
  // Accessing the wishlistsItems array from the Redux store's wishlists state.
  const { wishlistsItems } = useSelector((state) => state?.wishlists);
  // Logging wishlistsItems to the console for debugging.
  // console.log(wishlistsItems);
  // Using the useDarkMode hook to determine if dark mode is enabled.
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <div
        className={isDarkMode ? "dark-mode text-white" : "light-mode bg-white"}
      >
        <div className="">
          <div className="container mx-auto px-2 py-3">
            <h1 className="text-4xl text-center py-5  ">My Fav</h1>
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center">
              {wishlistsItems?.map(
                (wishlist: {
                  _id: any;
                  image?: string;
                  title?: string;
                  price?: number;
                  category?: string;
                }) => {
                  return <Wish key={wishlist?._id} wishlist={wishlist} />;
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavNews;


/*
FavNews Component Documentation:

This component is designed to display the user's favorite news articles, allowing for a personalized experience. It uses several hooks and components to achieve its functionality.

Dependencies:
- `useSelector` from `react-redux`: Accesses the Redux store's state, particularly the wishlist items.
- `Wish` component: Used for rendering individual wishlist items.
- `useDarkMode` custom hook: Toggles the application's theme between dark and light modes.

Functionality:
- Retrieves the user's wishlist items from the Redux store's state.
- Utilizes the `useDarkMode` hook to apply conditional styling based on the selected theme.
- Iterates over the wishlist items, rendering a `Wish` component for each item.

Features:
- Supports dynamic theming with light and dark modes.
- Responsive grid layout for displaying wishlist items.

Best Practices:
- Utilizes Redux for global state management, ensuring that the wishlist is accessible across the application.
- Implements conditional rendering and styling for theme support.
- Keeps the component focused on a single responsibility: displaying wishlist items.
*/
