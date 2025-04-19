import useNewsStore from "@/store/news/newsStore";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import gray from "@/assets/product/gray.svg";
import point from "@/assets/product/point.svg";

const NewsCard = ({ newsItem }) => {
  const { t } = useTranslation();

  const accessToken = localStorage.getItem("accessToken");

  const { getNews, news, loading, error, getOneNewsById, oneNew } =
    useNewsStore();

  const navigate = useNavigate();

  return (
    <div
      className="border-none rounded-xl p-1 relative z-0 flex flex-col gap-2 justify-center"
   
    >
      <div className="absolute top-5 sm:top-6 right-3 sm:right-6 z-10">
        <div className="border-none rounded-full bg-white p-2 sm:p-3">
          <SendOutlined className="text-[15px] sm:text-[21px]" />
        </div>
      </div>

      <div className="w-full h-[200px] sm:h-[288px] rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={newsItem.image ? newsItem.image : gray}
          alt="newsItem"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="border border-gray-800 rounded-2xl p-2 bg-white w-16 text-center">
          Politic
        </p>

        <p className="text-md sm:text-xl font-semibold">{newsItem.title}</p>

        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-1 items-center">
            <p className="text-xs text-black font-light">
              2.k {t("news.views")}
            </p>
            <img src={point} alt="point" />
            <p className="text-xs text-gray-600">
              {newsItem.created_at.slice(0, 10)}
            </p>
          </div>

          <div
            className="p-1 sm:p-2 border-none rounded-lg sm:rounded-xl bg-black"
            onClick={() => {
              getOneNewsById(newsItem.id);
              navigate(`/news/${newsItem.id}`);
            }}
          >
            <ArrowRightOutlined className="text-white text-[13px] sm:text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
