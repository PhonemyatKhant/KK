import Banner from "@/components/Banner";
import MainCarousel from "@/components/MainCarousel";
import ProductShowcase from "@/components/ProductShowcase";

export default async function Home() {
  return (
    <main>
     
      <MainCarousel />  
      <ProductShowcase />
      <Banner />
    </main>
  );
}
