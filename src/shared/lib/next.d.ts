import { Server as HTTPServer } from "http";
import { Socket } from "net";
import { Server as IOServer } from "socket.io";
import type { NextApiResponse } from "next";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};
