import type { Metadata } from "next";
import { CafeInfo } from "@/components/cafe-info";
import { InteriorList } from "@/components/interior-list";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  // const { data: session, status } = useSession();
  //
  // useEffect(() => {
  //     if (status === "authenticated") {
  //         console.log("User role:", session?.user?.role);
  //     }
  // }, [session, status]);

  return (
    <div className="py-4.5 px-5 w-full">
      <div className="flex justify-center items-start gap-6">
        <InteriorList />
        <CafeInfo />
      </div>
    </div>
  );
}
