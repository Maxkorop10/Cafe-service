import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import WaiterOrderBox from "@/components/waiter-order-box";

export function WaiterOrdersList() {
  return (
    <Tabs defaultValue="meals" className="w-[590px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="in_progress">In progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>

      <TabsContent value="new" className="flex flex-col gap-3">
        <WaiterOrderBox
          id={1}
          fullname={"Max Korop"}
          phone={"+380664317817"}
          status={"CREATED"}
          type={"TAKEAWAY"}
          in_process={true}
          completed={true}
          rejected={true}
          price={210}
        />
      </TabsContent>

      <TabsContent value="in_progress" className="flex flex-col gap-3">
        <WaiterOrderBox
          id={1}
          fullname={"Max Korop"}
          phone={"+380664317817"}
          status={"CREATED"}
          type={"TAKEAWAY"}
          in_process={false}
          completed={true}
          rejected={true}
          price={210}
        />
      </TabsContent>

      <TabsContent value="completed" className="flex flex-col gap-3">
        <WaiterOrderBox
          id={1}
          fullname={"Max Korop"}
          phone={"+380664317817"}
          status={"CREATED"}
          type={"TAKEAWAY"}
          in_process={false}
          completed={false}
          rejected={false}
          price={210}
        />
      </TabsContent>

      <TabsContent value="rejected" className="flex flex-col gap-3">
        <WaiterOrderBox
          id={1}
          fullname={"Max Korop"}
          phone={"+380664317817"}
          status={"CREATED"}
          type={"TAKEAWAY"}
          in_process={false}
          completed={false}
          rejected={false}
          price={210}
        />
      </TabsContent>
    </Tabs>
  );
}
