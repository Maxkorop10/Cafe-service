import { CheckCircle, ChefHat, Phone, TypeIcon, XCircle } from "lucide-react";
import { WaiterOrderBoxProps } from "@/components/waiter-order-box/types";
import { FC } from "react";

const WaiterOrderBox: FC<WaiterOrderBoxProps> = ({
  id,
  fullname,
  phone,
  status,
  type,
  booking_id,
  in_process,
  completed,
  rejected,
  price,
}) => {
  return (
    <div className="group w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row p-4 gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {id}. {fullname}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-600">
            <Phone size={16} className="text-gray-400" />
            <span className="text-sm font-medium">{phone}</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border">
              <span className="capitalize">{status}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              <TypeIcon size={14} />
              <span>
                {type}. {booking_id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 p-1">
            {in_process && (
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                <ChefHat size={16} className="text-blue-500" />
              </button>
            )}

            {completed && (
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-600 border border-green-100 hover:bg-green-100 transition-colors duration-200">
                <CheckCircle size={16} className="text-green-500" />
              </button>
            )}

            {rejected && (
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors duration-200">
                <XCircle size={16} className="text-red-500" />
              </button>
            )}
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
            <div className="text-lg text-gray-700 font-bold">{price} грн.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterOrderBox;
