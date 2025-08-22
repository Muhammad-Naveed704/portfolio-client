import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';
    const url = base.replace(/\/api$/, '');
    socket = io(url, { transports: ['websocket'] });
  }
  return socket;
}


