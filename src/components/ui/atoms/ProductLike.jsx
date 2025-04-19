import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/helpers/consts";
import useProductStore from "@/store/product/productStore";

const ProductLike = ({ isFavorite, green, id_product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const { changeLike } = useProductStore();

  if (!accessToken) return null;

  const handleLikeClick = async () => {
    await changeLike(id_product);
  };

  return (
    <div
      onClick={handleLikeClick}
      className={
        green === "green"
          ? "bg-[#E5FFED] w-7 sm:w-10 h-7 sm:h-10 border-none rounded-full flex justify-center items-center cursor-pointer"
          : "bg-white w-7 sm:w-10 h-7 sm:h-10 border-none rounded-full flex justify-center items-center cursor-pointer"
      }
    >
      {isFavorite ? (
        <HeartFilled className="text-[16px] sm:text-[24px] text-red-500 fill-red-500" />
      ) : (
        <HeartOutlined className="text-[16px] sm:text-[24px]" />
      )}
    </div>
  );
};

export default ProductLike;
