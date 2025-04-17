import { FC } from "react";
import Image from "next/image";
import privat_logo from "../../../public/privat24.png";
import mono_logo from "../../../public/mono.png";
import liqpay_logo from "../../../public/liqpay.png";
import { BankPickerProps } from "./types";

const BankPicker: FC<BankPickerProps> = ({ selectedIndex, onChange }) => {
  const paymentLogos = [
    { src: privat_logo, alt: "Privat24", className: "w-12 h-12" },
    { src: mono_logo, alt: "Monobank", className: "w-11 h-2" },
    { src: liqpay_logo, alt: "Liqpay", className: "w-12 h-3" },
  ];

  return (
    <div className="flex flex-row w-[290px] justify-between">
      {paymentLogos.map((logo, index) => (
        <div
          key={index}
          onClick={() => onChange(index)}
          className={`w-16 h-16 flex items-center justify-center border rounded-lg cursor-pointer
                    transform transition-transform duration-200
                    ${selectedIndex === index ? "border-black" : "border-gray-300"}`}
        >
          <Image src={logo.src} alt={logo.alt} className={logo.className} />
        </div>
      ))}
    </div>
  );
};

export default BankPicker;
