// components/CartItemCard.tsx
import { formatCurrency } from "@/helper/renderNumber";
import { CartItem } from "@/types/cart";
import Image from "next/image";

type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex gap-6 py-4 border-b text-[12px] text-custom-dark items-stretch">
      <div className="w-[112px] min-h-[112px] relative aspect-square">
        <Image
          src={item.product.image.url}
          alt={item.product.name ?? ""}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-1">
        <h3 className="text-[13px]">{item.product.name ?? ""}</h3>

        <div className="flex flex-col gap-2">
          <div className="text-gray-600">
            <p>
              <span className="font-semi">Color:</span> {item.product.color}
            </p>
            <p>
              <span className="font-semi">Size:</span> {item.product.size}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-[#D9D9D9] rounded-md overflow-hidden">
            <button
              onClick={onIncrease}
              className="px-3 py-1 hover:bg-gray-100 border-r border-[#D9D9D9] text-md"
            >
              +
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={onDecrease}
              className="px-3 py-1 hover:bg-gray-100 border-l border-[#D9D9D9] text-md"
            >
              -
            </button>
          </div>

          <button
            onClick={onRemove}
            className="text-custom-wine font-medium hover:underline"
          >
            Remove
          </button>
        </div>

        <p className="text-custom-wine font-semibold">
          {formatCurrency(item.product.price)} VND
        </p>
      </div>
    </div>
  );
}
