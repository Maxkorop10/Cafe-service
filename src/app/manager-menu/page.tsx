import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
};

export default function ManagerMenuPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Manager menu page!</p>
    </div>
  );
}
