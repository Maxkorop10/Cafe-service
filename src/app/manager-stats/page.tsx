import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics",
};

export default function ManagerStatsPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Manager stats page!</p>
    </div>
  );
}
