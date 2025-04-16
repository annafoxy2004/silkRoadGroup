import { FilterOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ui/atoms/ButtonLink";

const ShopDrawerLine = ({
  isActive,
  setIsActive,
  sidebarVisible,
  setSidebarVisible,
  selectedCategory,
  setSelectedCategory,
  open,
  setOpen,
  totalCount,
}) => {
  const { t } = useTranslation();

  const handleChange = (value) => {
    setSelectedCategory(value);
    setOpen(false);
  };

  return (
    <div className="mt-8 flex justify-between items-center">
      <div className="flex items-center gap-4 w-[432px] h-[36px]">
        <ButtonLink
          size="xs"
          bg="dark"
          imgSrc={<FilterOutlined className="text-[26px]" />}
          title={t("shop.filter")}
          onClick={() => {
            setIsActive(!isActive);
            setSidebarVisible(!sidebarVisible);
          }}
          
        />
        <p className="text-lg font-semibold text-gray-900 pl-2">
          {t("shop.sortBy")}:
        </p>
        <Select
          value={selectedCategory}
          open={open}
          onDropdownVisibleChange={setOpen}
          onChange={handleChange}
          suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
          className="border border-gray-200 rounded-xl w-48 h-9 text-gray-900 font-semibold"
          options={[
            { value: "all-courses", label: "Все курсы" },
            { value: "dried-fruits", label: "Сухофрукты" },
            { value: "vegetables-fruits", label: "Овощи и фрукты" },
            { value: "meats-eggs", label: "Мясо и яйца" },
            { value: "dairy-products", label: "Молочные продукты" },
            { value: "cereals-legumes", label: "Крупы и бобовые" },
          ]}
        />
      </div>
      <div className="flex items-center justify-center text-black font-bold">
        {`${t("shop.total")}: ${totalCount}`}
      </div>
    </div>
  );
};

export default ShopDrawerLine;
