import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { MenuBoxProps } from "@/components/menu-box/types";
import { FC } from "react";

const MenuBox: FC<MenuBoxProps> = ({
  icon,
  title,
  description,
  weight,
  price,
}) => {
  return (
    <div className="w-[700px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex p-2 gap-5 items-center">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-300">
          <Image
            src={icon}
            alt="Food Image"
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
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
          <Button className="mt-1 w-25 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Замовити
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
