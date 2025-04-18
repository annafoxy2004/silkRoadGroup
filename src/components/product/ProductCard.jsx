import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../ui/atoms/ButtonLink";
import CartIcon from "@/assets/header/CartIcon";
import useProductStore from "@/store/product/productStore";
import ProductLike from "../ui/atoms/ProductLike";
import { API } from "@/helpers/consts";
import gray from "@/assets/product/gray.svg";
import point from "@/assets/product/point.svg";
import rating from "@/assets/product/rating.svg";

const ProductCard = ({ product, btnTitle, isfav }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const accessToken = localStorage.getItem("accessToken");
  const {
    getOneProductById,
    addToCart2,
    changeLike,
    getFavorites,
    favProducts,
  } = useProductStore();
  const navigate = useNavigate();

  const displayProduct = isfav ? favProducts : product;

  if (!displayProduct || !displayProduct.translations) return null;

  const translatedData = displayProduct.translations[currentLang] ||
    displayProduct.translations.en || {
      name: "No name",
      description: "No description",
    };

  const handleAddToCart = () => {
    // addToCart2(displayProduct); // Добавляем продукт в корзину
    // navigate("/cart"); // Перенаправляем на страницу корзины
  };

  return (
    <div
      onClick={() => {
        getOneProductById(displayProduct.slug);
        navigate(`/products/${displayProduct.id}`);
        getFavorites();
      }}
      className="rounded-xl shadow-md p-1 sm:p-4 relative z-0 flex flex-col gap-2 justify-center"
    >
      <div className="absolute top-5 sm:top-6 right-3 sm:right-6 z-10">
        <ProductLike
          isFavorite={displayProduct.is_favorite}
          green="white"
          id_product={displayProduct.slug}
          onClick={() => {
            changeLike(displayProduct.slug);
            // getFavorites()
          }}
        />
      </div>

      <div className="w-full h-[200px] sm:h-[288px] rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            displayProduct.first_image
              ? `${API}/${displayProduct.first_image}`
              : gray
          }
          alt="product"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p
          className="text-md sm:text-xl font-semibold"
          onClick={() => {
            navigate(`/products/${displayProduct.id}`);
          }}
        >
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
              {displayProduct.price}
              <span>$</span>
            </div>  <ButtonLink
            bg="dark"
            size="xs"
            title={t("shop.addToCart")}
            imgSrc={<CartIcon color="white" />}
            onClick={handleAddToCart}
            className="ml-2 sm:ml-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
