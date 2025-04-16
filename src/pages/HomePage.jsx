import HomeBanner from "@/components/home/HomeBanner";
import HomeBlocks from "@/components/home/HomeBlocks";
import HomeCategories from "@/components/home/HomeCategories";
import HomeProductList from "@/components/home/HomeProductList";
import PartnersInfo from "@/components/home/PartnersInfo";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* <Banner />
      <Categories />
      <ProductCards />
      <Infocards />
      <PartnersInfo /> */}
      <HomeBanner/>
      <HomeCategories/>
      <HomeProductList/>
      <HomeBlocks/>
      <PartnersInfo/>
    </div>
  );
}
