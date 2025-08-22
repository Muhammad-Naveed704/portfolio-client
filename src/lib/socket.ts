import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket() {
  if (socket) return socket;
  const base = process.env.NEXT_PUBLIC_API_BASE?.replace('/api', '') || 'http://localhost:4000';
  socket = io(base, { transports: ['websocket'] });
  return socket;
}

export function joinUserRoom(userId: string) {
  const s = getSocket();
  s.emit('user:join', userId);
}



