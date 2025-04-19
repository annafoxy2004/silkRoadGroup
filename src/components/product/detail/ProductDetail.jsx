import BreadCrumbsDetails from "@/components/ui/atoms/BreadCrumbsDetail";
import useProductStore from "@/store/product/productStore";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import gray from "@/assets/product/gray.svg";
import { API } from "@/helpers/consts";
import Loading from "@/components/ui/widjets/loading/Loading";
import point from "@/assets/product/point.svg";
import rating from "@/assets/product/rating.svg";
import { RightOutlined } from "@ant-design/icons";
import ButtonLink from "@/components/ui/atoms/ButtonLink";
import ProductLike from "@/components/ui/atoms/ProductLike";
import ProductsAlsoSee from "./ProductsAlsoSee";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { oneProduct, getOneProductById, addToCart, changeLike } = useProductStore();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { i18n, t } = useTranslation();

  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 0);
  };

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      getOneProductById(slug).finally(() => setIsLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentLang = i18n.language.split("-")[0];

  useEffect(() => {
    // getOneProductById(product.slug);
    if (oneProduct?.images?.length) {
      setActiveImage(`${API}/${oneProduct.images[0]}`);
    }
  }, [oneProduct]);

  useEffect(() => {
    if (!isLoading && !oneProduct) {
      navigate(-1);
    }
  }, [isLoading, oneProduct]);

  if (!oneProduct || !oneProduct.translations) {
    return (
      navigate(-1)
    ) // 👈 можно показать загрузку, пока товар не загружен
  }

  const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) return null;

  const translatedData = oneProduct.translations[currentLang] ||
    oneProduct.translations.en || {
      name: t("product.no_name", "No name"),
      description: t("product.no_description", "No description"),
    };

  const translatedCategory = oneProduct.category.translations[currentLang] ||
    oneProduct.translations.en || {
      name: t("product.no_name", "No name"),
    };

  const ImageWrapper = ({ src }) => (
    <div className="w-full overflow-hidden">
      <img
        className="w-full h-[500px] sm:h-[650px] object-cover border-none rounded-xl"
        src={src}
        alt="product"
      />
    </div>
  );

  const ImageWrapper2 = ({ src, onClick }) => (
    <div
      className=" h-[100px] sm:h-[120px] overflow-hidden pb-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-full object-cover border-none rounded-xl"
        src={src}
        alt="product-thumbnail"
      />
    </div>
  );

  return (
    <div>
      <div className="p-3 sm:p-16">
        <BreadCrumbsDetails />
        <div className="grid grid-cols-1 md:grid-cols-[640px_1fr_1fr] gap-6 md:h-[900px] ">
          <div>
            <div className="h-[500px] sm:h-[650px] flex gap-3">
              <div className="img-carousel h-full overflow-y-scroll">
                {oneProduct.images.map((item, key) => {
                  const imageSrc = item ? `${API}/${item}` : gray;
                  return (
                    <ImageWrapper2
                      key={key}
                      src={imageSrc}
                      onClick={() => setActiveImage(imageSrc)}
                    />
                  );
                })}
              </div>

              <ImageWrapper src={activeImage || gray} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-1/2">
              <div className="bg-gray-100 p-2 py-5 font-light h-8 text-[14px] border-none rounded-xl flex justify-center items-center gap-1">
                <p>{translatedCategory.name}</p>
                <RightOutlined className="text-xs" />{" "}
              </div>
            </div>

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
            </div>

            <div className="flex flex-col gap-10 overflow-y-scroll">
              <div className="flex justify-between items-center ">
                <p className="font-bold text-[18px]">
                  {t("productDetail.description")}
                </p>
                <div className="bg-gray-100 p-2 h-7 text-[14px] font-light border-none rounded-xl flex justify-center items-center gap-1">
                  <p>{t("productDetail.go")}</p>
                  <RightOutlined className="text-xs" />{" "}
                </div>
              </div>

              <ul className="flex flex-col w-full">
                <li className="h-8 w-full border-b border-b-gray-200 flex justify-between items-center">
                  <span className="font-light text-[14px]">
                    {" "}
                    {t("productDetail.category")}
                  </span>
                  <span className="font-semibold text-[15px]">
                    {translatedCategory.name}{" "}
                  </span>
                </li>
                <li className="h-8 w-full border-b border-b-gray-200 flex justify-between items-center">
                  <span className="font-light text-[14px]">
                    {" "}
                    {t("productDetail.data")}
                  </span>
                  <span className="font-semibold text-[15px]">
                    {oneProduct.shelf_life}
                  </span>
                </li>{" "}
                <li className="h-8 w-full border-b border-b-gray-200 flex justify-between items-center">
                  <span className="font-light text-[14px]">
                    {t("productDetail.temp")}
                  </span>
                  <span className="font-semibold text-[15px]">
                    {oneProduct.minimum_temperature}
                  </span>
                </li>{" "}
                <li className="h-8 w-full border-b border-b-gray-200 flex justify-between items-center">
                  <span className="font-light text-[14px]">
                    {" "}
                    {t("productDetail.stock")}
                  </span>
                  <span className="font-semibold text-[15px]">
                    {oneProduct.stock}
                  </span>
                </li>
              </ul>

              <p className="text-gray-500 font-light text-[15px]">
                {translatedData.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="border-2 rounded-xl border-gray-100 p-2 h-40 w-full flex flex-col gap-7 justify-center  sm:items-center">
              <div className="flex justify-between">
                <span className="text-[34px] font-semibold">
                  {oneProduct.price} $
                </span>
                <span className="line-through text-[14px] text-gray-400 border-none rounded-xl p-3 bg-[#B9FFCE] w-1/3">
                  {oneProduct.old_price} $
                </span>
              </div>

              <div className="flex justify-between items-center">
                <ButtonLink
                  bg="dark"
                  size="sm"
                  title={t("shop.addToCart")}
                  onClick={() => oneProduct && addToCart(oneProduct)}
                />
                <ProductLike
                  isFavorite={oneProduct.is_favorite}
                  green="green"
                  id_product={oneProduct.slug}
                  onClick={() => changeLike(oneProduct.slug)}
                />
              </div>
            </div>

            <ButtonLink
              bg="light"
              size="lg"
              title={t("productDetail.oneClick")}
              to={accessToken ? "/checkout" : "/"}
            />
          </div>
        </div>
      </div>
      <ProductsAlsoSee />
    </div>
  );
};

export default ProductDetail;
