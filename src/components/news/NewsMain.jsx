import useNewsStore from "@/store/news/newsStore";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../ui/widjets/loading/Loading";
import NewsCard from "./NewsCard";

const NewsMain = () => {
  const { t } = useTranslation();
  const { getNews, news, loading, error } = useNewsStore();

  useEffect(() => {
    getNews();
  }, []);
  

  return (
    <div className="p-5 py-10 sm:p-10 flex flex-col gap-4">
      <div className="flex flex-col items-start gap-3">
        <p className="font-medium text-[50px] sm:text-[56px]">
          {t("news.title1")}
        </p>
        <p className="font-light text-[18px]">{t("news.title2")}</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1 sm:gap-6">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              newsItem={item}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <p>no news</p>
        </div>
      )}
    </div>
  );
};

export default NewsMain;
