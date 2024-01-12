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
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTopics } = location.state || {};
  console.log("selected topi", selectedTopics);
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
        {/* nav */}
        {/* <HeaderNavigationMenu title={"React News App"} /> */}
        {/* <CategoryComponent /> */}

        {/* <div className="grid grid-cols-3"> */}
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
