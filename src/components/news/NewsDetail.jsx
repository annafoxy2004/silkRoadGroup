import { API } from "@/helpers/consts";
import useNewsStore from "@/store/news/newsStore";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import gray from "@/assets/product/gray.svg";
import point from "@/assets/product/point.svg";
import Loading from "../ui/widjets/loading/Loading";

const NewsDetail = () => {
  const { getNews, news, loading, error, getOneNewsById, oneNew } =
    useNewsStore();
  const { t } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getOneNewsById(id).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading || !oneNew) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="py-10 px-10">

      <div className="border-none p-1 flex flex-col gap-10 justify-center ">
        <p className="text-md sm:text-xl font-semibold">{oneNew.title}</p>

        <div className="w-full h-[300px] sm:h-[488px] rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={oneNew.image ? oneNew.image : gray}
            alt="newsItem"
          />
        </div>
        <p className="text-[16px] font-light">{oneNew.content}</p>

        <div className="flex gap-1 items-center justify-end">
          <p className="text-xs text-black font-light">2.k {t("news.views")}</p>
          <img src={point} alt="point" />
          <p className="text-xs text-gray-600">
            {oneNew.created_at?.slice(0, 10)}
          </p>
        </div>
      </div>

    </div>
  );
};

export default NewsDetail;
