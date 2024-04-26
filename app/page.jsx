import Banner from "@/components/Banner";
import MainCarousel from "@/components/MainCarousel";
import ProductShowcase from "@/components/ProductShowcase";

export default async function Home() {
  return (
    <main>
      <MainCarousel />
      <div className=" text-center my-20 ">
        <h1 className=" mb-6 text-4xl font-medium">About Us</h1>
        <p className=" text-lg font-medium">
          {" "}
          KK Fabrics is an e-commerce website that sells locally made products
          <br></br> from Myanmar related to Fashion, Clothing, and Accessories.
        </p>
      </div>
      <ProductShowcase />
      <Banner />
    </main>
  );
}
