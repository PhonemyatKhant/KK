import ProductCard from "@/components/productCard";

export async function getProducts() {
  const apiEndpoint = process.env.API_ENDPOINT;

  const res = await fetch(`http://localhost:3000/api/products?${Date.now()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
