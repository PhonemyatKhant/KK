import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link href={`/collections/${product._id}`}>
      <div className="shadow-md rounded-lg overflow-hidden h-96">
        <Image
          className="w-full h-2/3 object-fill "
          src={`${product.image}`}
          alt={product.name}
          width={64}
          height={64}
        />
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold overflow-hidden whitespace-no-wrap truncate">
            {product.name}
          </h3>
          <p className="text-gray-700">{product.brand}</p>
          <p className="text-xl font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
