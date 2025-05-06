import { FC } from "react";
import Image from "next/image";
import { WaiterOrderDialogProps } from "@/components/waiter-order-dialog/types";

const WaiterOrderDialog: FC<WaiterOrderDialogProps> = ({ orderId, items }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4 border-slate-600 border-1">
      <h2 className="text-xl font-semibold text-gray-800">
        🧾 Деталі замовлення № {orderId}
      </h2>

      {items?.length ? (
        items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-4 last:border-none"
          >
            <Image
              src={item.meal_img}
              alt={item.meal_name}
              width={64}
              height={64}
              className="rounded-lg object-cover border"
            />
            <div className="flex flex-col">
              <span className="text-md font-medium text-gray-800">
                {item.meal_name}
              </span>
              <span className="text-sm text-gray-500">× {item.quantity}</span>
            </div>
            <div className="ml-auto font-semibold text-gray-800">
              {item.price * item.quantity} ₴
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">У цьому замовленні немає позицій.</p>
      )}
    </div>
  );
};

export default WaiterOrderDialog;
