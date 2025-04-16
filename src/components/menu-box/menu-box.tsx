"use client";

import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { MenuBoxProps } from "@/components/menu-box/types";
import { FC } from "react";
import { useCartStore } from "@/shared/lib/store/cart-store";

const MenuBox: FC<MenuBoxProps> = ({
  id,
  icon,
  title,
  description,
  weight,
  price,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const isInCart = items.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem({
        id,
        title,
        price,
        weight,
        imageUrl: icon,
      });
    }
  };

  return (
    <div className="w-[700px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex p-2 gap-5 items-center">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-300">
          <Image
            src={icon}
            alt="Food Image"
            fill={true}
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col flex-1 gap-1.5">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm leading-tight w-full">
            {description}
          </p>
          <span className="text-gray-500 text-sm">Вага: {weight} г</span>
        </div>

        <div className="flex flex-col text-right mt-7 px-2">
          <span className="text-lg font-bold text-gray-900">{price} грн.</span>
          <Button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`mt-1 w-25 px-4 py-2 rounded-lg text-white transition-colors ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isInCart ? "У кошику" : "Замовити"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
