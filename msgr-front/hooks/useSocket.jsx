import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5050";

export const useSocket = ({ onConnect, onDisconnect, listeners = {} } = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);

      onConnect?.(socket);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
      onDisconnect?.();
    });

    // Register custom listeners
    Object.entries(listeners).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      // Remove listeners and disconnect on cleanup
      Object.entries(listeners).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
      socket.disconnect();
    };
  }, []);

  return socketRef;
};
