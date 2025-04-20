import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useProductStore from "@/store/product/productStore";

const ProductLike = ({ isFavorite, green, id_product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const { changeLike } = useProductStore();

  // ⚡️ локальный стейт, начальное значение берем из пропсов
  const [liked, setLiked] = useState(isFavorite);

  if (!accessToken) return null;

  const handleLikeClick = async () => {
    // 👇 Меняем локально сразу
    setLiked((prev) => !prev);
    try {
      await changeLike(id_product); // отправка на сервер
    } catch (error) {
      // если запрос не удался — откатываем обратно
      setLiked((prev) => !prev);
      console.error("Ошибка при лайке:", error);
    }
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
      {liked ? (
        <HeartFilled className="text-[16px] sm:text-[24px] text-red-500 fill-red-500" />
      ) : (
        <HeartOutlined className="text-[16px] sm:text-[24px]" />
      )}
    </div>
  );
};

export default ProductLike;
