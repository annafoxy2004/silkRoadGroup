import AboutUsPage from "@/pages/AboutUsPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import FAQPage from "@/pages/FAQPage";
import FavouritesPage from "@/pages/FavouritesPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import NewsPage from "@/pages/NewsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import SignUpPage from "@/pages/SignUpPage";
import { Route, Routes, Navigate } from "react-router-dom";

export default function Routing() {
  const accessToken = localStorage.getItem("accessToken");

  const PUBLIC_PAGES = [
    { link: "/", page: <HomePage />, id: 1 },
    { link: "/about-us", page: <AboutUsPage />, id: 2 },

    { link: "/news", page: <NewsPage />, id: 3 },
    { link: "/news/:id", page: <NewsDetailPage />, id: 12 },

    { link: "/products", page: <ProductsPage />, id: 4 },
    { link: "/products/:id", page: <ProductDetailPage />, id: 8 },

    { link: "/faq", page: <FAQPage />, id: 5 },
    { link: "/signup", page: <SignUpPage />, id: 6 },
    { link: "/login", page: <LoginPage />, id: 7 },

    {
      link: "/cart",
      page: <CartPage />,
      id: 9,
    },
    {
      link: "/favourites",
      page: <FavouritesPage />,
      id: 10,
    },
    {
      link: "/checkout",
      page: <CheckoutPage />,
      id: 11,
    },
  ];

  return (
    <Routes>
      {PUBLIC_PAGES.map((page) => (
        <Route
          path={page.link}
          element={<div className="pt-32 sm:pt-40">{page.page}</div>}
          key={page.id}
        />
      ))}
    </Routes>
  );
}
