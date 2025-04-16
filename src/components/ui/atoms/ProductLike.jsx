import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";

const ProductLike = () => {
  const [liked, setLiked] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div
      onClick={handleLikeClick}
      className="bg-white w-7 sm:w-10 h-7 sm:h-10 border-none rounded-full flex justify-center items-center cursor-pointer"
    >
      {liked ? (
        <HeartOutlined className="text-[16px] sm:text-[24px]" />
      ) : (
        <HeartFilled className="text-[16px] sm:text-[24px] text-red-500 fill-red-500" />
      )}
    </div>
  );
};

export default ProductLike;
