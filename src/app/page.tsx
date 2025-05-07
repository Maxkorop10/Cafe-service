import type { Metadata } from "next";
import { CafeInfo } from "@/components/cafe-info";
import { InteriorList } from "@/components/interior-list";
import { GoogleMap } from "@/components/google-map";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="py-4.5 px-5 w-full">
      <div className="flex justify-center items-start gap-6">
        <InteriorList />
        <div className="grid grid-cols-1 gap-4">
          <CafeInfo />
          <GoogleMap />
        </div>
      </div>
    </div>
  );
}
