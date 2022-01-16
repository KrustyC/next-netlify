import { Product } from "@/types/global";
import { LinkIcon } from "../../icons/Link";
import { PriceIcon } from "../../icons/Price";

interface ProductCardProps {
  product: Product;
  onWantToRemoveProduct: VoidFunction;
}

function formatPriceBrowser(price: number | null): string {
  if (price === null) {
    return "Free";
  }

  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(price);
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWantToRemoveProduct,
}) => (
  <div className="bg-white shadow rounded-lg p-4 ">
    <div className="flex flex-col">
      <span className="text-xl font-bold text-gray-900">{product.name}</span>

      <div className="flex mb-2">
        <div className="flex items-end mr-4">
          <div className="icon-wrapper">
            <LinkIcon height="h-4" width="w-4" />
          </div>
          <span className="ml-1 text-sm text-gray-600">
            <a
              className="text-admin-link"
              href={product.etsyLink}
              target="_blank"
              rel="noreferrer"
            >
              View on Etsy
            </a>
          </span>
        </div>

        <div className="flex items-end">
          <div className="icon-wrapper">
            <PriceIcon height="h-4" width="w-4" />
          </div>
          <span className="ml-1 text-sm text-gray-600">
            {formatPriceBrowser(product.price)}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-end mt-2 w-100">
        <div>
          <a
            href={`/admin/products/${product._id}`}
            className="btn-admin btn-primary btn-sm text-base uppercase mr-2"
          >
            Edit
          </a>

          <button
            className="btn-admin btn-danger btn-sm text-base uppercase"
            onClick={onWantToRemoveProduct}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
);
