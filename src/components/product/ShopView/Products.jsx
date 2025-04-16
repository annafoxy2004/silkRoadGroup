import { MenuOutlined, FilterOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { Drawer, Button, Select } from "antd"; // импорт Drawer и Button
import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { useTranslation } from "react-i18next";
import ButtonLink from "../../ui/atoms/ButtonLink";
import useProductStore from "@/store/product/productStore";
import ProductList from "../ProductList";
import BurgerSideBar from "../SideBar/BurgerSideBar";

export const Products = ({ pathname }) => {
  const [open, setOpen] = useState(false); // Состояние для Drawer
  const [selectedCategory, setSelectedCategory] = useState("all-courses");
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();
  const { products } = useProductStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Добавляем состояние для боковой панели

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCount = products.length;

  const showDrawer = () => setOpen(true);  // Функция для открытия Drawer
  const onClose = () => setOpen(false);  // Функция для закрытия Drawer

  return (
    <div className="sm:flex  gap-5 ">
      {isMobile ? (
        <>
          <Drawer placement="bottom" onClose={onClose} open={open}>
            <BurgerSideBar open={open} onClose={onClose} />
          </Drawer>
        </>
      ) : (
        <>
          <SideBar sidebarVisible={sidebarVisible} /> {/* Здесь передаем sidebarVisible */}
        </>
      )}

      <div className="sm:flex-1 px-10 sm:px-16">
        <p className="text-3xl font-semibold text-[#20A647] py-5">
          {t("shop.allProducts")}
        </p>

        <div className="mt-7 flex justify-between items-center">
          <div className="filter__left flex items-center justify-between sm:w-[432px] h-9">
            {isMobile ? (
              <ButtonLink
                size="xs"
                bg= "dark" 
                onClick={showDrawer}  // Открыть Drawer
              >
                <FilterOutlined style={{ marginRight: "8px" }} />
                {t("shop.filter")}
              </ButtonLink>
            ) : (
              <ButtonLink
              size="xs"
              bg="dark"
              onClick={() => {
                setIsActive(!isActive);
                setSidebarVisible(prevState => !prevState);  // Переключаем видимость панели
              }}
            >
              <FilterOutlined style={{ marginRight: "8px" }} />
              {t("shop.filter")}
            </ButtonLink>
            
            )}
{
  isMobile?(
<></>
  ):(
            <p className="font-semibold text-[13px] sm:text-base text-gray-900">
              {t("shop.sortBy")}:
            </p>

  )
}
          </div>
          <p className="font-semibold text-[13px] sm:text-base text-gray-900">
            {`${t("shop.total")}: ${totalCount}`}
          </p>
        </div>

        <div className="products-list mt-5">
          <div >
            <ProductList pathname={pathname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
