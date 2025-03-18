"use client";

import Image from "next/image";

const images = [
  "/interior-1.jpg",
  "/interior-2.jpg",
  "/interior-3.webp",
  "/interior-4.jpg",
];

export function InteriorList() {
  return (
    <div className="min-w-[980px] w-auto grid grid-cols-2 md:col-span-2 gap-4 p-3 rounded-2xl bg-slate-900/50 backdrop-filter backdrop-blur-lg border-1 border-slate-400 bg-opacity-30 firefox:bg-opacity-90">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-full h-66 rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src={src}
            alt={`Interior ${index + 1}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hover:scale-100 scale-110 transition-transform duration-300 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
