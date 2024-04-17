// Importing useLocation from react-router-dom to access the current location object.
import { useLocation } from "react-router-dom";
// Importing a utility function to filter and slice articles based on certain criteria.
import { filterAndSliceArticles } from "../../../utils/filterAndSliceArticles/filterAndSliceArticles";
// Importing a utility function to calculate time elapsed since a given date.
import { timeElapsedSince } from "../../../utils/timeElapsed/timeElapsed";
// Importing reusable UI components for category header and loading indicator.
import CategoryHeader from "../../atoms/CategoryHeader/Header";
import Loader from "../../atoms/Loader/Loader";
// Importing the Card component to display individual articles.
import Card from "../../molecules/Card/Card";

// DetailPage component for displaying articles of a specific category.
const DetailPage = () => {
  // Using useLocation hook to access the location state passed from the previous route.
  const location = useLocation();
  // Extracting the category object from the location state.
  const { category }: any = location.state;

  return (
    // Fragment to return a list of elements without adding extra nodes to the DOM.
    <>
      <div className="">
        {/* CategoryHeader displays the title of the current category. */}
        <CategoryHeader title={category.title} />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-10">
          {/* Conditional rendering to check if category data exists. */}
          {category.data ? (
            // If data exists, filter and slice the articles, then map over them to render a Card for each.
            filterAndSliceArticles(category.data, 10).map(
              (article: any, index: number) => (
                <Card
                  key={index}
                  source={article.source.name}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  title={article.title}
                  description={article.content}
                  // Displaying how much time has elapsed since the article was published.
                  lastUpdated={timeElapsedSince(article.publishedAt)}
                />
              )
            )
          ) : (
            // Render a Loader component if there's no data available.
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPage;

/*
DetailPage Component Documentation:

This component is responsible for rendering the detail view of a specific category's articles. It utilizes several custom utility functions and components for its operation.

Dependencies:
- react-router-dom's useLocation for accessing route state.
- Utility functions for filtering/slicing articles and calculating time elapsed.
- Reusable UI components (CategoryHeader, Loader, Card) for consistent design.

Structure:
- The component uses a React fragment to group the list of elements.
- It dynamically renders a grid of Card components based on the category data passed via route state.

Functionality:
- On component mount, it retrieves the category data from the location state.
- It displays a header for the category and a grid of articles.
- Each article is presented in a Card component, which includes the article's source, title, description, image, and the time elapsed since its publication.

Best Practices:
- Utilize reusable components for UI consistency and maintainability.
- Keep utility functions separate for better testing and reuse across components.
*/

