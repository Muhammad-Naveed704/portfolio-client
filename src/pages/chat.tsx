import Layout from '@/components/Layout';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type ChatMsg = { name: string; message: string; at: number };

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [name, setName] = useState('Guest');
  const [text, setText] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE?.replace('/api', '') || 'http://localhost:4000';
    const s = io(base, { transports: ['websocket'] });
    socketRef.current = s;
    s.on('chat:message', (payload: ChatMsg) => {
      setMessages((m) => [...m, payload]);
    });
    return () => { s.disconnect(); };
  }, []);

  function send() {
    const msg: ChatMsg = { name, message: text, at: Date.now() };
    setMessages((m) => [...m, msg]);
    socketRef.current?.emit('chat:message', msg);
    setText('');
  }

  return (
    <Layout title="Chat">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Realtime Chat</h1>
        <div className="mt-6 grid gap-3 max-w-2xl">
          <div className="flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="card px-4 py-2 flex-1" placeholder="Your name" />
          </div>
          <div className="card p-4 h-96 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className="py-1">
                <span className="font-medium">{m.name}:</span> <span>{m.message}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="card px-4 py-2 flex-1" placeholder="Type a message" />
            <button onClick={send} className="px-5 py-2 rounded-full bg-brand text-white">Send</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

