// Imports necessary React hooks, Router hooks for navigation, utility functions for data processing, 
// custom components for UI rendering, context for global state management, and styles.

import { default as React, useContext, useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { filterAndSliceArticles } from "../../../utils/filterAndSliceArticles/filterAndSliceArticles";
import { timeElapsedSince } from "../../../utils/timeElapsed/timeElapsed";
import CategoryHeader from "../../atoms/CategoryHeader/Header";
import Loader from "../../atoms/Loader/Loader";
import Card from "../../molecules/Card/Card";
import HeaderNavigationMenu from "../../organisms/Navigation/HeaderNavigationMenu";
import { NewsAppContext } from "../../organisms/context/NewsAppContext";
import "./Home.styles.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

const HomeComponent: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  // HomeComponent is a React functional component designed to display news articles based on user-selected topics.
// It demonstrates the use of React hooks for state and context management, effect side effects, and navigation.

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTopics } = location.state || {};
  console.log("selected topi", selectedTopics);

   // useContext hook to access and manipulate global state within the NewsAppContext.
  const {
    businessState,
    setBusinessState,
    entertainmentState,
    setEntertainmentState,
    healthState,
    setHealthState,
    scienceState,
    setScienceState,
    sportsState,
    setSportsState,
    technologyState,
    setTechnologyState,

  }: any = useContext(NewsAppContext);

  const initialState = {
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
    loading: true,
    error: null,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          ...state,
          [action.category]: action.articles,
          loading: false,
          error: null,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const API_KEY = "677afcb07c1a4acfbaf13f3c69420943";
  const fetchArticles = async (category: any) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      switch (category) {
        case "business":
          setBusinessState(data.articles);
          break;
        case "entertainment":
          setEntertainmentState(data.articles);
          break;
        case "health":
          setHealthState(data.articles);
          break;
        case "science":
          setScienceState(data.articles);
          break;
        case "sports":
          setSportsState(data.articles);
          break;
        case "technology":
          setTechnologyState(data.articles);
          break;
        default:
          console.error(`Invalid category: ${category}`);
      }
      dispatch({ type: "FETCH_SUCCESS", category, articles: data.articles });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", error });
    }
  };

  useEffect(() => {
    if (selectedTopics && selectedTopics.length > 0) {
      selectedTopics.forEach((topic: string) => {
        fetchArticles(topic.toLowerCase());
      });
    } else {
      const topicsString = localStorage.getItem("topics");

      if(topicsString == undefined) return navigate("/login")
      const topic = topicsString?.split(",");
      topic?.forEach((topic) => {
        fetchArticles(topic.toLowerCase());
      });
    }
  }, [selectedTopics]);

  const {
    loading,
    error,
  } = state;

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const categoryDetailPage = (val: any, data: any) => {
    const category = { title: val, data: data };
    navigate(`/detail/${val}`, { state: { category } });
  };
  return (
    <>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-10 justify-between">
          {/* left */}
          {technologyState.length > 0 && (
            <div>
              <CategoryHeader
                title={"Technology"}
                onClick={() =>
                  categoryDetailPage("technology", technologyState)
                }
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(technologyState, 2).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}
          {/* center */}

          {healthState.length > 0 && (
            <div className="overflow-hidden" style={{ flex: "0 0 30%" }}>
              <CategoryHeader
                title={"Health"}
                onClick={() => categoryDetailPage("health", healthState)}
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(healthState, 2).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}
          {/* right */}
          {scienceState.length > 0 && (
            <div style={{ flex: "0 0 30%" }}>
              <CategoryHeader
                title={"Science"}
                onClick={() => categoryDetailPage("science", scienceState)}
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(scienceState, 2).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}
          {/* left */}
          {sportsState.length > 0 && (
            <div style={{ flex: "0 0 30%" }}>
              <CategoryHeader
                title={"Sports"}
                onClick={() => categoryDetailPage("sports", sportsState)}
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(sportsState, 2).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}

          {/* center */}

          {entertainmentState.length > 0 && (
            <div style={{ flex: "0 0 30%" }}>
              <CategoryHeader
                title={"Entertainment"}
                onClick={() =>
                  categoryDetailPage("entertainment", entertainmentState)
                }
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(entertainmentState, 2).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}
          {/* right */}
          {businessState.length > 0 && (
            <div style={{ flex: "0 0 30%" }}>
              <CategoryHeader
                title={"Business"}
                onClick={() => categoryDetailPage("business", businessState)}
              />
              {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

              {loading ? (
                <Loader />
              ) : (
                filterAndSliceArticles(businessState, 3).map(
                  (article: any, index: number) => (
                    <Card
                      key={index}
                      source={article.source.name}
                      url={article.url}
                      imageUrl={article.urlToImage}
                      title={article.title}
                      lastUpdated={timeElapsedSince(article.publishedAt)}
                    />
                  )
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;


    // Header Comments: Start with a brief description of the component's purpose, how it fits into the larger application, and any high-level considerations like theme support or key functionalities.

    // Import Statements: Document the purpose of imported hooks, components, and utilities to clarify their roles within the component.

    // Component Structure: Provide a high-level overview of the component's functionality and its use of React patterns such as context, hooks, and conditional rendering.

    // State Management: Explain the choice of state management technique (useState, useReducer, or context) and the structure of the component's state.

    // Effects and Data Fetching: Detail how side effects are managed with useEffect, including data fetching logic, dependencies, and any cleanup actions.

    // Context Usage: Describe how the component interacts with global state using useContext and the specific pieces of state it consumes or updates.

    // Rendering Logic: Comment on the rendering logic, including conditional rendering based on state, mapping over data to produce a list of elements, and any event handling functions.

    // Function Documentation: For each function within the component, briefly describe its purpose, parameters, return values, and any side effects or state updates it performs.

    // Security and Optimization Notes: Highlight any areas where the code could be optimized for performance or where security best practices could be better applied, such as securing API keys or managing resource-intensive operations.

    // This comprehensive approach ensures that each significant line or block of code in your component is accompanied by explanations or justifications, making the component more understandable and maintainable.