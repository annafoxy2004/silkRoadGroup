import { useTranslation } from "react-i18next";
import point from "@/assets/product/point.svg";
import rating from "@/assets/product/rating.svg";
import CartIcon from "@/assets/header/CartIcon";
import { API } from "@/helpers/consts";
import gray from "@/assets/product/gray.svg";
import ProductLike from "../ui/atoms/ProductLike";
import ButtonLink from "../ui/atoms/ButtonLink";
import { Link } from "react-router-dom";

const ProductCard = ({ product, btnTitle }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const accessToken = localStorage.getItem("accessToken");

  if (!product || !product.translations) return null;

  const translatedData = product.translations[currentLang] ||
    product.translations.en || {
      name: "No name",
      description: "No description",
    };

  const ImageWrapper = ({ src }) => (
    <div className="w-full h-[200px] sm:h-[288px] rounded-xl overflow-hidden">
      <img className="w-full h-full object-cover" src={src} alt="product" />
    </div>
  );

  const productLink = `/products/${product.id}`; // Создаем правильный путь

  if (!accessToken) {
    return (
      <Link
        to={productLink}
        className="rounded-xl shadow-md p-1 sm:p-4 relative z-0 flex flex-col gap-2 justify-center"
      >
        <div className="absolute top-5 sm:top-6 right-3 sm:right-6 z-10">
          <ProductLike />
        </div>

        <ImageWrapper
          src={
            product.first_image != null ? `${API}/${product.first_image}` : gray
          }
        />

        <div className="flex flex-col gap-2">
          <p className="text-md sm:text-xl font-semibold">
            {translatedData.name}
          </p>
          <div className="flex gap-1 items-center">
            <img src={rating} alt="rating" />
            <p className="text-xs sm:text-base text-black">4.9</p>
            <img src={point} alt="point" />
            <p className="text-xs text-gray-600">153 ratings</p>
          </div>

          <div className="flex gap-2 flex-wrap sm:flex-nowrap items-center w-full">
            <div className="sm:bg-gray-200 sm:w-2/5 flex items-center justify-center gap-1 px-3 py-1 sm:py-3 sm:px-10 rounded-2xl transition-all text-[14px] sm:text-sm font-medium">
              {product.price}
              <span>c</span>
            </div>
            <ButtonLink
              bg="light"
              size="xs"
              title={btnTitle}
              imgSrc={<CartIcon color="black" />}
            />
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        to={productLink}
        className="rounded-xl shadow-md p-1 sm:p-4 relative z-0 flex flex-col gap-2 justify-center"
      >
        <div className="absolute top-5 sm:top-6 right-3 sm:right-6 z-10">
          <ProductLike />
        </div>

        <ImageWrapper
          src={
            product.first_image != null ? `${API}/${product.first_image}` : gray
          }
        />

        <div className="flex flex-col gap-2">
          <p className="text-md sm:text-xl font-semibold">
            {translatedData.name}
          </p>
          <div className="flex gap-1 items-center">
            <img src={rating} alt="rating" />
            <p className="text-xs sm:text-base text-black">4.9</p>
            <img src={point} alt="point" />
            <p className="text-xs text-gray-600">153 ratings</p>
          </div>

          <div className="flex gap-2 flex-wrap sm:flex-nowrap items-center w-full">
            <div className="sm:bg-gray-200 sm:w-2/5 flex items-center justify-center gap-1 px-3 py-1 sm:py-3 sm:px-10 rounded-2xl transition-all text-[14px] sm:text-sm font-medium">
              {product.price}
              <span>c</span>
            </div>
            <ButtonLink
              bg="dark"
              size="xs"
              title={btnTitle}
              imgSrc={<CartIcon color="white" />}
            />
          </div>
        </div>
      </Link>
    );
  }
};

export default ProductCard;
