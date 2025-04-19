import { Breadcrumb, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BreadCrumbsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pathSnippets = location.pathname.split("/").filter(Boolean);

  const routeNameMap = {
    "": t("header.main"),
    "about-us": t("header.about_us"),
    news: t("header.news"),
    products: t("header.shop"),
    faq: t("header.faq"),
    signup: t("header.signup", "Sign Up"),
    login: t("header.login"),
    cart: t("header.cart"),
    favourites: t("header.favorites"),
  };

  const breadcrumbItems = [
    {
      title: <Link to="/" className="text-gray-400">{t("header.main")}</Link>,
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const currentSegment = pathSnippets[index];
      const isLast = index === pathSnippets.length - 1;

      let name = routeNameMap[currentSegment];

      if (!name) {
        const isProductId = pathSnippets[index - 1] === "products";
        if (isProductId) {
          name = t("header.catalog", "Product Details");
        } else {
          name = decodeURIComponent(currentSegment);
        }
      }

      return {
        title: isLast ? name : <Link className="text-[#20A647]" to={url}>{name}</Link>,
      };
    }),
  ];

  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        type="link"
        icon={<ArrowLeftOutlined className="text-gray-400" />}
        onClick={() => navigate(-1)}
        className="px-0"
      >
      </Button>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default BreadCrumbsDetails;
