import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "@/shared/lib/next";
import { Server as IOServer } from "socket.io";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    console.log("🔌 Socket.io server is initialised");

    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("🟢 Client is connected:", socket.id);

      socket.on("send-order-update", (data) => {
        io.emit("receive-order-update", data);
      });

      socket.on("disconnect", () => {
        console.log("🔴 The client is disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
