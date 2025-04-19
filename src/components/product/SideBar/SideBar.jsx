import useProductStore from "@/store/product/productStore";
import "./SideBar.css";
import { Collapse, Checkbox, Slider } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/components/ui/widjets/loading/Loading";

export const SideBar = ({ sidebarVisible }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const {
    getCategories,
    getProducts,
    categories,
    setCategory,
    selectedCategory,
    loading,
    filterProductsByPrice,
  } = useProductStore();

  useEffect(() => {
    getCategories();
    getProducts(); // нужно для фильтрации по категориям
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );
  }

  const handleInputPriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "min") {
      setMinInput(value);
    } else if (name === "max") {
      setMaxInput(value);
    }
  
    // Фильтрация по цене сразу при изменении значений
    const newMin = minInput === "" ? 0 : Math.max(0, Number(minInput));
    const newMax = maxInput === "" ? 1000 : Math.max(newMin, Number(maxInput));
    setPriceRange([newMin, newMax]);
    filterProductsByPrice(newMin, newMax); // фильтруем сразу
  };
  

  const handlePriceConfirm = () => {
    const newMin = minInput === "" ? 0 : Math.max(0, Number(minInput));
    const newMax = maxInput === "" ? 1000 : Math.max(newMin, Number(maxInput));
    setPriceRange([newMin, newMax]);
    filterProductsByPrice(newMin, newMax); // <-- фильтруем по цене!
  };
  

  const handleCategoryChange = (checkedValues) =>
    setSelectedCategories(checkedValues);
  const handleRatingChange = (checkedValues) =>
    setSelectedRatings(checkedValues);
  const handleTypeChange = (checkedValues) => setSelectedTypes(checkedValues);
  const handlePriceChange = (value) => setPriceRange(value);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99984 12.8083L14.1498 15.9166L12.7832 10.0583L17.3332 6.11658L11.3415 5.60825L8.99984 0.083252L6.65817 5.60825L0.666504 6.11658L5.2165 10.0583L3.84984 15.9166L8.99984 12.8083Z"
              fill="#EAA000"
            />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99984 12.8083L14.1498 15.9166L12.7832 10.0583L17.3332 6.11658L11.3415 5.60825L8.99984 0.083252L6.65817 5.60825L0.666504 6.11658L5.2165 10.0583L3.84984 15.9166L8.99984 12.8083Z"
              fill="#EAA000"
              clipPath="url(#half-star)"
            />
            <defs>
              <clipPath id="half-star">
                <rect x="0" y="0" width="9" height="16" />
              </clipPath>
            </defs>
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99984 12.8083L14.1498 15.9166L12.7832 10.0583L17.3332 6.11658L11.3415 5.60825L8.99984 0.083252L6.65817 5.60825L0.666504 6.11658L5.2165 10.0583L3.84984 15.9166L8.99984 12.8083Z"
              fill="#EAA000"
              opacity="0.2"
            />
          </svg>
        );
      }
    }

    return stars;
  };

  

  const items = [
    {
      key: "1",
      label: t("sideBar.categories"),
      children: (
        <Checkbox.Group
          onChange={handleCategoryChange}
          value={selectedCategories}
        >
          <div className="flex flex-col gap-2.5">
            {categories.map((cat) => {
              const translatedName =
                cat.translations?.[currentLang]?.name ||
                cat.translations?.en?.name ||
                cat.name;

              return (
                <Checkbox key={cat.id}
                onClick={() => setCategory(cat.id)}  value={cat.slug}>
                  {translatedName}
                </Checkbox>
              );
            })}
          </div>
        </Checkbox.Group>
      ),
    },
    {
      key: "2",
      label: t("sideBar.ratings"),
      children: (
        <Checkbox.Group onChange={handleRatingChange} value={selectedRatings}>
          <div className="flex flex-col gap-2.5">
            {["5.0", "4.0", "3.0", "2.0", "1.0"].map((value) => (
              <Checkbox value={value} key={value}>
                <div className="flex items-center gap-2">
                  <span className="stars">
                    {renderStars(parseFloat(value))}
                  </span>
                  <span>
                    {value} {t("sideBar.andAbove")} (3 890)
                  </span>
                </div>
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      ),
    },
    {
      key: "3",
      label: t("sideBar.price"),
      children: (
        <>
          <div className="px-2">
            {/* <Slider
              range
              min={0}
              max={1000}
              value={priceRange}
              onChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]} c</span>
              <span>{priceRange[1]} c</span>
            </div> */}
          </div>
          <div className="flex justify-between mt-2">
            <input
              placeholder={t("sideBar.from")}
              type="number"
              name="min"
              value={minInput}
              onChange={handleInputPriceChange}
              onKeyDown={(e) => e.key === "Enter" && handlePriceConfirm()}
              className="inputPrice_from"
              min={0}
            />
            <input
              placeholder={t("sideBar.to")}
              type="number"
              name="max"
              value={maxInput}
              onChange={handleInputPriceChange}
              onKeyDown={(e) => e.key === "Enter" && handlePriceConfirm()}
              className="inputPrice_to"
              min={0}
            />
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: t("sideBar.type"),
      children: (
        <Checkbox.Group onChange={handleTypeChange} value={selectedTypes}>
          <div className="flex flex-col gap-2.5">
            <Checkbox value="type1">Текст в типе</Checkbox>
            <Checkbox value="type2">Текст в типе</Checkbox>
            <Checkbox value="type3">Текст в типе</Checkbox>
          </div>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <div className={`sidebar ${!sidebarVisible ? "collapsed" : ""}`}>
      <Collapse
        defaultActiveKey={["1", "2", "3", "4"]}
        expandIconPosition="end"
        items={items}
      />
    </div>
  );
};

export default SideBar;
