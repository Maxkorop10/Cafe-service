import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io({
        path: "/api/socket",
      });

      socket.current.on("connect", () => {
        console.log(
          "🟢 Connected to the Socket.IO server:",
          socket.current?.id,
        );
      });

      socket.current.on("disconnect", () => {
        console.log("🔴 Disconnecting from the Socket.IO server");
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return socket;
};
