import { Clock4, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function CafeInfo() {
  const Info = [
    { icon: Phone, name: "Номер телефону", info: "+380664213510" },
    { icon: Mail, name: "Пошта", info: "coffee2go@gmail.com" },
    { icon: Instagram, name: "Instagram", info: "@coffee2go" },
    { icon: Clock4, name: "Графік роботи", info: "Пн-Нд: 09:00 — 22:00" },
    { icon: MapPin, name: "Локація", info: "Черкаси, вул. Хрещатик, 29" },
  ];

  return (
    <div className="bg-white p-4 px-5 rounded-2xl shadow-lg w-fit h-fit">
      <h3 className="text-blue-600 font-bold text-xl mb-3">Про нас</h3>

      <div className="grid grid-cols-1 gap-2 mb-1">
        {Info.map(({ icon: Icon, name, info }, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon className="text-gray-700 w-5 h-5 shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">{name}</p>
              <p className="text-black font-medium">{info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
