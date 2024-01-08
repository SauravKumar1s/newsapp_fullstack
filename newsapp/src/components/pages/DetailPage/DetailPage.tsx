import { useLocation } from "react-router-dom";
import { filterAndSliceArticles } from "../../../utils/filterAndSliceArticles/filterAndSliceArticles";
import { timeElapsedSince } from "../../../utils/timeElapsed/timeElapsed";
import CategoryHeader from "../../atoms/CategoryHeader/Header";
import Loader from "../../atoms/Loader/Loader";
import Card from "../../molecules/Card/Card";

const DetailPage = () => {
  const location = useLocation();
  const { category }: any = location.state;

  return (
    <>
      <div className="">
        <CategoryHeader title={category.title} />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-10">
          {category.data ? (
            filterAndSliceArticles(category.data, 10).map(
              (article: any, index: number) => (
                <Card
                  key={index}
                  source={article.source.name}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  title={article.title}
                  description={article.content}
                  lastUpdated={timeElapsedSince(article.publishedAt)}
                />
              )
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
