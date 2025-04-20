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
import useCartStore from "@/store/cart/cartStore";

const ProductCard = ({ product, btnTitle, isfav }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const {
    getOneProductById,
    changeLike,
    getFavorites,
    favProducts,
  } = useProductStore();
  const navigate = useNavigate();
  const { setOneCartItem } = useCartStore();
  const accessToken = localStorage.getItem("accessToken");

  const displayProduct = isfav
    ? favProducts.find((item) => item.id === product.id)
    : product;

  if (!displayProduct || !displayProduct.translations) return null;

  const translatedData =
    displayProduct.translations[currentLang] ||
    displayProduct.translations.en || {
      name: "No name",
      description: "No description",
    };

    const handleCardClick = async () => {
      if (accessToken) {
        getFavorites();
      }
    
      await getOneProductById(displayProduct.slug); // дождись данных
      navigate(`/products/${displayProduct.id}`);   // потом переходи
    };
    

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!accessToken) return;

    await changeLike(displayProduct.slug);
    // `getFavorites` уже вызывается внутри `changeLike`, здесь не требуется
  };

  return (
    <div className="rounded-xl shadow-md p-1 sm:p-4 relative z-0 flex flex-col gap-2 justify-center">
      <div className="absolute top-5 sm:top-6 right-3 sm:right-6 z-10">
        <ProductLike
          className="product-like-button"
          isFavorite={displayProduct.is_favorite}
          green="white"
          id_product={displayProduct.slug}
          onClick={handleFavoriteClick}
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
        <div onClick={handleCardClick}>
          <p className="text-md sm:text-xl font-semibold">
            {translatedData.name}
          </p>

          <div className="flex gap-1 items-center">
            <img src={rating} alt="rating" />
            <p className="text-xs sm:text-base text-black">4.9</p>
            <img src={point} alt="point" />
            <p className="text-xs text-gray-600">153 ratings</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap items-center w-full">
          <div className="sm:bg-gray-200 sm:w-2/5 flex items-center justify-center gap-1 px-3 py-1 sm:py-3 sm:px-10 rounded-2xl transition-all text-[14px] sm:text-sm font-medium">
            {displayProduct.price}
            <span>$</span>
          </div>
          <ButtonLink
            bg="dark"
            size="xs"
            title={t("shop.addToCart")}
            imgSrc={<CartIcon color="white" />}
            onClick={(e) => {
              e.stopPropagation();
              setOneCartItem(displayProduct.id);
            }}
            className="ml-2 sm:ml-0"
          />
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
