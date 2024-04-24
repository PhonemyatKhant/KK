import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link href={`/collections/${product._id}`}>
      <div className="shadow-md rounded-lg overflow-hidden h-64 sm:h-96">
        <Image
          className="object-center object-cover h-2/3 w-full rounded-t-lg"
          src={`${product.image}`}
          alt={product.name}
          width={64}
          height={64}
        />
        <div className="p-4 bg-white">
          <h3 className="text-sm sm:text-lg font-semibold overflow-hidden whitespace-no-wrap truncate">
            {product.name}
          </h3>
          <p className="text-gray-700">{product.brand}</p>
          {product.isOnSale ? (
            <>
              {" "}
              <p className=" line-through text-red-600 inline text-sm sm:text-lg font-semibold">
                K{product.price}
              </p>
              <span className="text-sm sm:text-lg font-semibold">
                {" "}
                K{((100 - product.discountPercentage) / 100) * product.price}
              </span>
            </>
          ) : (
            <>
              {" "}
              <p className="  inline text-sm sm:text-lg font-semibold">
                K{product.price}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
