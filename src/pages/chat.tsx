import Layout from '@/components/Layout';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchConversations, fetchMessages, sendMessageApi, ChatMessage, ConversationPreview, sendAnonymousMessage, getAnonymousHistory } from '@/lib/api';
import { getSocket, joinUserRoom } from '@/lib/socket';

export default function ChatPage() {
  // 🔥 added mounted guard
  const [mounted, setMounted] = useState(false); 
  useEffect(() => { setMounted(true); }, []); 

  // 🔥 only access localStorage after mount
  const me = mounted ? (localStorage.getItem('userId') || localStorage.getItem('guestUserId') || '') : ''; 
  const isAuthenticated = mounted ? Boolean(localStorage.getItem('authToken')) : false; // 🔥 updated

  const [selected, setSelected] = useState<string | null>(null);
  const qc = useQueryClient();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return; // 🔥 updated
    if (me) joinUserRoom(me);
    const s = getSocket();
    const handler = (m: ChatMessage) => {
      const peer = m.senderId === me ? m.receiverId : m.senderId;
      qc.setQueryData<ChatMessage[]>(['messages', peer], (old) => [ ...(old || []), m ]);
      // For anonymous mode, push into anon cache if relevant
      const isGuest = !Boolean(localStorage.getItem('authToken'));
      const myGuestId = localStorage.getItem('guestUserId');
      if (isGuest && myGuestId && (m.senderId === myGuestId || m.receiverId === myGuestId)) {
        qc.setQueryData<ChatMessage[]>(['anonMessages'], (old: any) => [ ...(old || []), m ]);
      }
      qc.invalidateQueries({ queryKey: ['conversations'] });
    };
    s.on('chat:message', handler);
    return () => { s.off('chat:message', handler); };
  }, [me, qc, mounted]); // 🔥 updated deps

  const convQ = useQuery({ queryKey: ['conversations'], queryFn: () => fetchConversations(), enabled: mounted && isAuthenticated });
  const msgsQ = useQuery({ queryKey: ['messages', selected], queryFn: () => fetchMessages(String(selected)), enabled: Boolean(selected) && isAuthenticated });
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgsQ.data?.length]);

  const sendMut = useMutation({
    mutationFn: (p: { to: string; text: string }) => sendMessageApi(p.to, p.text),
    onSuccess: (m) => {
      qc.setQueryData<ChatMessage[]>(['messages', selected], (old) => [ ...(old || []), m ]);
      qc.invalidateQueries({ queryKey: ['conversations'] });
      setText('');
    }
  });
  const anonSendMut = useMutation({
    mutationFn: (p: { text: string }) => sendAnonymousMessage(localStorage.getItem('userName') || 'Guest', p.text),
    onSuccess: (data) => {
      if (data?.guestUserId) {
        joinUserRoom(String(data.guestUserId));
        setSelected(String(data.guestUserId));
      }
      if (data?.message) {
        qc.setQueryData<ChatMessage[]>(['anonMessages'], (old:any) => [ ...(old || []), data.message ]);
      }
      setText('');
    }
  });

  const anonHistoryQ = useQuery({
    queryKey: ['anonMessages'],
    queryFn: async () => {
      const data = await getAnonymousHistory();
      if (data?.guestUserId) localStorage.setItem('guestUserId', data.guestUserId);
      return data?.messages || [];
    },
    enabled: mounted && !isAuthenticated, // 🔥 updated
    // onSuccess: () => {
    //   const gid = localStorage.getItem('guestUserId');
    //   if (gid) joinUserRoom(gid);
    // }
  });
  useEffect(() => {
  if (anonHistoryQ.isSuccess) {
    const gid = localStorage.getItem('guestUserId');
    if (gid) joinUserRoom(gid);
  }
}, [anonHistoryQ.isSuccess]);
  const sidebar = useMemo(() => convQ.data || [], [convQ.data]);

  // Auto-select first conversation when authenticated and list loads
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!selected && Array.isArray(sidebar) && sidebar.length > 0) {
      setSelected(sidebar[0].peer._id);
    }
  }, [isAuthenticated, sidebar, selected]);

  // UI helpers (must be declared before any conditional returns to keep hooks order stable)
  const selectedPeer = useMemo(() => sidebar.find((c: any) => c.peer._id === selected)?.peer, [sidebar, selected]);
  const headerName = isAuthenticated ? (selectedPeer?.name || 'Select chat') : 'Support';

  // 🔥 prevent mismatch by waiting for mount
  if (!mounted) {
    return <Layout title="Chat"><p className="text-sm text-gray-500 p-4">Loading chat...</p></Layout>;
  }

  return (
    <Layout title="Chat">
      <div className="container-responsive py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sidebar */}
        <aside className="card md:col-span-1 h-[78vh] flex flex-col overflow-hidden">
          <div className="px-3 pt-3 pb-2 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/20 text-brand grid place-items-center">{(localStorage.getItem('userName') || 'You').toString().charAt(0)}</div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{localStorage.getItem('userName') || 'You'}</p>
                <p className="text-xs text-muted truncate">@{(localStorage.getItem('userId')||localStorage.getItem('guestUserId')||'me').slice(0,6)}</p>
              </div>
            </div>
            <div className="mt-3">
              <input className="w-full px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm outline-none" placeholder="Search chats" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isAuthenticated && sidebar.map((c: ConversationPreview) => (
              <button key={c.peer._id} onClick={() => setSelected(c.peer._id)} className={`w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${selected===c.peer._id?'bg-gray-100 dark:bg-gray-800':''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">{c.peer.name?.charAt(0) || 'U'}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{c.peer.name}</p>
                      {c.unread>0 && <span className="text-xs bg-brand text-white rounded-full px-2 py-0.5">{c.unread}</span>}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{c.lastMessage?.message}</p>
                  </div>
                </div>
              </button>
            ))}
            {!isAuthenticated && (
              <div className="text-sm text-gray-500 px-2">Anonymous chat: your messages are private to you and the admin.</div>
            )}
            {isAuthenticated && sidebar.length === 0 && (
              <div className="px-2 py-3 text-sm text-gray-500 space-y-2">
                <p>No chats yet. Send a first message to start a thread.</p>
              </div>
            )}
          </div>
        </aside>

        {/* Chat window */}
        <section className="card md:col-span-2 h-[78vh] flex flex-col overflow-hidden">
          {/* Header like the reference */}
          <div className="px-4 py-3 flex items-center justify-between" style={{background:'#00a884'}}>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">{headerName?.charAt(0)}</div>
              <div>
                <p className="font-medium leading-none">{headerName}</p>
                <p className="text-xs opacity-80">{isAuthenticated? 'Online' : 'Support'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <button aria-label="call">📞</button>
              <button aria-label="video">🎥</button>
              <button aria-label="menu">⋮</button>
            </div>
          </div>

          {/* Messages */}
          {isAuthenticated && !selected && (
            <div className="p-3 flex gap-2">
              <input value={text} onChange={(e)=>setText(e.target.value)} className="card px-3 py-2 flex-1" placeholder="Type a message to start a new chat" />
              <button onClick={()=> text && anonSendMut.mutate({ text })} className="px-4 py-2 rounded bg-brand text-white">Send</button>
            </div>
          )}

          {isAuthenticated && selected && (
            <>
              <div className="flex-1 overflow-y-auto space-y-2 px-3 py-4" style={{background:'#efeae2'}}>
                {(msgsQ.data || []).map((m) => {
                  const mine = m.senderId === me;
                  return (
                    <div key={m._id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${mine ? 'bg-[#d9fdd3]' : 'bg-white'} px-3 py-2 rounded-xl shadow-sm max-w-[75%]`}>
                        <p className="text-sm whitespace-pre-wrap break-words">{m.message}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
              {/* Composer */}
              <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 sticky bottom-0">
                <button aria-label="emoji" className="px-2">😊</button>
                <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 px-3 py-2 rounded-full bg-gray-100 outline-none" placeholder="Type a message" />
                <button onClick={()=> selected && text && sendMut.mutate({ to: selected, text })} className="w-10 h-10 rounded-full bg-[#00a884] text-white grid place-items-center">➤</button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <div className="flex-1 overflow-y-auto space-y-2 px-3 py-4" style={{background:'#efeae2'}}>
                {(anonHistoryQ.data || []).map((m: any) => {
                  const mine = m?.senderId === localStorage.getItem('guestUserId');
                  return (
                    <div key={m._id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${mine ? 'bg-[#d9fdd3]' : 'bg-white'} px-3 py-2 rounded-xl shadow-sm max-w-[75%]`}>
                        <p className="text-sm whitespace-pre-wrap break-words">{m.message}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
              <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 sticky bottom-0">
                <button aria-label="emoji" className="px-2">😊</button>
                <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 px-3 py-2 rounded-full bg-gray-100 outline-none" placeholder="Type a message anonymously" />
                <button onClick={()=> text && anonSendMut.mutate({ text })} className="w-10 h-10 rounded-full bg-[#00a884] text-white grid place-items-center">➤</button>
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
