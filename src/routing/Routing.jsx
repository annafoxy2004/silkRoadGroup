import Footer from "@/components/ui/widjets/footer/Footer";
import Header from "@/components/ui/widjets/header/Header";
import AboutUsPage from "@/pages/AboutUsPage";
import CartPage from "@/pages/CartPage";
import FAQPage from "@/pages/FAQPage";
import FavouritesPage from "@/pages/FavouritesPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NewsPage from "@/pages/NewsPage";
import ProductsPage from "@/pages/ProductsPage";
import SignUpPage from "@/pages/SignUpPage";
import { Route, Routes } from "react-router-dom";

export default function Routing() {
  const PUBLIC_PAGES = [
    { link: "/", page: <HomePage />, id: 1 },
    { link: "/about-us", page: <AboutUsPage />, id: 2 },
    { link: "/news", page: <NewsPage />, id: 3 },
    { link: "/products", page: <ProductsPage />, id: 4 },
    // { link: "/profile", page: <ProfilePage />, id: 5 },
    { link: "/faq", page: <FAQPage />, id: 6 },
    { link: "/signup", page: <SignUpPage />, id: 7 },
    { link: "/login", page: <LoginPage />, id: 8 },
    // { link: "/products/:id", page: <ProductDetails />, id: 9 },
    { link: "/cart", page: <CartPage />, id: 10 },
    { link: "/favourites", page: <FavouritesPage />, id: 11 },
  ];

  return (
    <Routes>
      {PUBLIC_PAGES.map((page) => (
        <Route path={page.link} element={
        <>{page.page}</>
      } key={page.id} />
      ))}
    </Routes>
  );
}
