import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchbar";

export async function getProducts() {
  const apiEndpoint = process.env.API_ENDPOINT;

  const res = await fetch(`http://localhost:3000/api/products?${Date.now()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}
export const getUniqueValues = (productsArray) => {
  const categories = new Set();
  const brands = new Set();
  let maxPrice = productsArray[0].price;

  for (const product of productsArray) {
    if (product.category) {
      categories.add(product.category);
    }
    if (product.brand) {
      brands.add(product.brand);
    }
    if (product.price > maxPrice) {
      maxPrice = product.price;
    }
  }

  const p = {};
  p.categoryOptions = [...categories];
  p.brandOptions = [...brands];
  p.maxPrice = maxPrice;

  return p;
};

const page = async () => {
  const products = await getProducts();
  const { categoryOptions, brandOptions, maxPrice } = getUniqueValues(products);
  return (
    <div className="container gap-5 flex mx-auto px-4">
      <Sidebar
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        maxPrice={maxPrice}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
        <SearchBar />
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
