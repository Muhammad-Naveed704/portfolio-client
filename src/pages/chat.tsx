import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchConversations, 
  fetchMessages, 
  sendMessageApi, 
  ChatMessage, 
  ConversationPreview, 
  sendAnonymousMessage, 
  getAnonymousHistory,
  getOnlineUsers,
  sendGuestMessage,
  getGuestMessages,
  initializeGuestUser,
  getAdminConversations,
  adminReplyToGuest,
  OnlineUser
} from '@/lib/api';
import { getSocket, joinUserRoom } from '@/lib/socket';
import { motion } from 'framer-motion';
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip } from 'lucide-react';


export default function ChatPage() {
  const [mounted, setMounted] = useState(false); 
  useEffect(() => { setMounted(true); }, []); 

  const [myUserId, setMyUserId] = useState<string>('');
  const [myName, setMyName] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const qc = useQueryClient();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isAuthenticated = mounted ? Boolean(localStorage.getItem('authToken')) : false;
  const userRole = mounted ? localStorage.getItem('userRole') : null;
  const isAdmin = userRole === 'admin';

  // Initialize guest user on mount
  useEffect(() => {
    if (!mounted || isAuthenticated) return;
    
    const initUser = async () => {
      try {
        const existingName = localStorage.getItem('userName') || `User${Math.floor(Math.random() * 10000)}`;
        const data = await initializeGuestUser(existingName);
        if (data?.userId) {
          setMyUserId(data.userId);
          setMyName(data.name || existingName);
          joinUserRoom(data.userId);
        }
      } catch (err) {
        console.error('Failed to initialize user:', err);
        // Fallback: create local user ID
        const fallbackId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const fallbackName = localStorage.getItem('userName') || `User${Math.floor(Math.random() * 10000)}`;
        setMyUserId(fallbackId);
        setMyName(fallbackName);
        localStorage.setItem('guestUserId', fallbackId);
        localStorage.setItem('userName', fallbackName);
        joinUserRoom(fallbackId);
      }
    };
    
    initUser();
  }, [mounted, isAuthenticated]);

  // Get authenticated user info
  useEffect(() => {
    if (!mounted || !isAuthenticated) return;
    const userId = localStorage.getItem('userId') || '';
    const userName = localStorage.getItem('userName') || 'User';
    setMyUserId(userId);
    setMyName(userName);
    if (userId) joinUserRoom(userId);
  }, [mounted, isAuthenticated]);

  // Socket message handler
  useEffect(() => {
    if (!mounted || !myUserId) return;
    
    const s = getSocket();
    const handler = (m: ChatMessage) => {
      const peer = m.senderId === myUserId ? m.receiverId : m.senderId;
      
      // For guest users chatting with support, use 'support' as peer ID
      const displayPeer = (!isAuthenticated && (m.senderId === 'support' || m.receiverId === 'support')) 
        ? 'support' 
        : peer;
      
      // Update messages for the peer
      qc.setQueryData<ChatMessage[]>(['messages', displayPeer], (old) => {
        const exists = old?.some(msg => msg._id === m._id);
        if (exists) return old;
        return [...(old || []), m];
      });
      
      // Also update anonymous messages if it's a guest message
      if (!isAuthenticated) {
        qc.setQueryData<ChatMessage[]>(['anonMessages'], (old: any) => {
          const exists = old?.some((msg: ChatMessage) => msg._id === m._id);
          if (exists) return old;
          return [...(old || []), m];
        });
      }
      
      // Update conversations list
      qc.invalidateQueries({ queryKey: ['conversations'] });
      qc.invalidateQueries({ queryKey: ['onlineUsers'] });
    };
    
    s.on('chat:message', handler);
    s.on('user:online', () => {
      qc.invalidateQueries({ queryKey: ['onlineUsers'] });
    });
    s.on('user:offline', () => {
      qc.invalidateQueries({ queryKey: ['onlineUsers'] });
    });
    
    return () => {
      s.off('chat:message', handler);
      s.off('user:online', () => {});
      s.off('user:offline', () => {});
    };
  }, [myUserId, qc, mounted, isAuthenticated]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUserId]);

  // Queries
  const convQ = useQuery({
    queryKey: ['conversations'],
    queryFn: () => isAdmin ? getAdminConversations() : fetchConversations(),
    enabled: mounted && isAuthenticated,
    refetchInterval: 10000,
  });

  const onlineUsersQ = useQuery({
    queryKey: ['onlineUsers'],
    queryFn: () => getOnlineUsers(),
    enabled: mounted && !isAuthenticated && !!myUserId,
    refetchInterval: 5000,
  });

  const msgsQ = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => {
      if (isAuthenticated) {
        return fetchMessages(String(selectedUserId));
      } else {
        // If chatting with support, use anonymous history
        if (selectedUserId === 'support') {
          return getAnonymousHistory().then(data => data?.messages || []);
        }
        return getGuestMessages(String(selectedUserId));
      }
    },
    enabled: Boolean(selectedUserId) && mounted,
  });

  useEffect(() => {
    if (msgsQ.data) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [msgsQ.data?.length]);

  // Mutations
  const sendMut = useMutation({
    mutationFn: (p: { to: string; text: string }) => {
      if (isAuthenticated) {
        // If admin, use admin reply function
        if (isAdmin) {
          return adminReplyToGuest(p.to, p.text);
        }
        return sendMessageApi(p.to, p.text);
      } else {
        // If sending to support, use anonymous message
        if (p.to === 'support') {
          return sendAnonymousMessage(myName || 'Guest', p.text);
        }
        return sendGuestMessage(p.to, p.text);
      }
    },
    onSuccess: (m) => {
      qc.setQueryData<ChatMessage[]>(['messages', selectedUserId], (old) => {
        const exists = old?.some(msg => msg._id === m._id);
        if (exists) return old;
        return [...(old || []), m];
      });
      qc.invalidateQueries({ queryKey: ['conversations'] });
      qc.invalidateQueries({ queryKey: ['onlineUsers'] });
      setText('');
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
  });

  const handleSend = () => {
    if (!text.trim() || !selectedUserId) return;
    sendMut.mutate({ to: selectedUserId, text: text.trim() });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get sidebar data
  const sidebarData = useMemo(() => {
    if (isAuthenticated) {
      return convQ.data || [];
    } else {
      const users = onlineUsersQ.data || [];
      const otherUsers = users
        .filter((u: OnlineUser) => u.userId !== myUserId)
        .map((u: OnlineUser) => ({
          peer: {
            _id: u.userId,
            name: u.name,
            email: '',
          },
          lastMessage: null,
          unread: 0,
          isOnline: u.isOnline,
        }));
      
      // Always show Support option for guests
      const supportUser = {
        peer: {
          _id: 'support',
          name: 'Support',
          email: '',
        },
        lastMessage: null,
        unread: 0,
        isOnline: true,
      };
      
      return [supportUser, ...otherUsers];
    }
  }, [convQ.data, onlineUsersQ.data, myUserId, isAuthenticated]);

  // Filter sidebar by search
  const filteredSidebar = useMemo(() => {
    if (!searchQuery) return sidebarData;
    const query = searchQuery.toLowerCase();
    return sidebarData.filter((item: any) =>
      item.peer?.name?.toLowerCase().includes(query)
    );
  }, [sidebarData, searchQuery]);

  // Auto-select support for guests, first conversation for authenticated
  useEffect(() => {
    if (!selectedUserId && filteredSidebar.length > 0) {
      if (!isAuthenticated) {
        // For guests, always select support first
        setSelectedUserId('support');
      } else {
        setSelectedUserId(filteredSidebar[0].peer._id);
      }
    }
  }, [filteredSidebar.length, selectedUserId, isAuthenticated]);

  const selectedPeer = useMemo(() => {
    return sidebarData.find((item: any) => item.peer._id === selectedUserId)?.peer;
  }, [sidebarData, selectedUserId]);

  if (!mounted) {
    return (
      <Layout title="Chat">
        <div className="container-responsive py-4">
          <p className="text-sm text-gray-500 p-4">Loading chat...</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEO
        title="Chat | Real-time Messaging | Xws Solution"
        description="Connect with Xws Solution team and other users through our real-time chat platform. Get instant support, discuss projects, and communicate with our development team. Real-time messaging powered by WebSocket technology."
        keywords="Chat, Real-time Messaging, Live Chat, Support Chat, WebSocket Chat, Instant Messaging, Team Communication, Customer Support, Project Discussion, Xws Solution Chat"
        canonical="https://xws.digital/chat"
        noindex={true}
      />
    <Layout title="Chat">
        <div className="container-responsive py-4 h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-0 h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
            {/* Sidebar - WhatsApp style */}
            <aside className="bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
              {/* User header */}
              <div className="px-4 py-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                    {myName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{myName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {isAdmin ? 'Admin' : isAuthenticated ? 'Authenticated' : 'Guest User'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="px-3 py-3 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search or start new chat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto">
                {filteredSidebar.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    {isAuthenticated ? (
                      <p>No conversations yet. Start chatting!</p>
                    ) : (
                      <p>No other users online. Be the first to start chatting!</p>
                    )}
                  </div>
                ) : (
                  <div className="py-1">
                    {filteredSidebar.map((item: any) => {
                      const isSelected = item.peer._id === selectedUserId;
                      return (
                        <motion.button
                          key={item.peer._id}
                          onClick={() => setSelectedUserId(item.peer._id)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                            isSelected ? 'bg-gray-100 dark:bg-gray-800' : ''
                          }`}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-purple-500/20 text-brand dark:text-purple-400 flex items-center justify-center font-semibold text-sm">
                                {item.peer.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              {!isAuthenticated && item.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-900 dark:text-white truncate text-sm">
                                  {item.peer.name}
                                </p>
                                {item.unread > 0 && (
                                  <span className="text-xs bg-brand text-white rounded-full px-2 py-0.5 min-w-[20px] text-center">
                                    {item.unread}
                                  </span>
                                )}
                              </div>
                              {item.lastMessage && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {item.lastMessage.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
              </div>
            )}
          </div>
        </aside>

            {/* Chat window - WhatsApp style */}
            <section className="flex flex-col h-full bg-[#efeae2] dark:bg-gray-900">
              {selectedUserId ? (
                <>
                  {/* Chat header */}
                  <div className="px-4 py-3 bg-[#00a884] dark:bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold">
                        {selectedPeer?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
              <div>
                        <p className="font-semibold text-white text-sm">{selectedPeer?.name || 'User'}</p>
                        <p className="text-xs text-white/80">
                          {isAuthenticated ? 'Online' : 'Active'}
                        </p>
              </div>
            </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
            </div>
          </div>

          {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4d4d4\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
                    {(msgsQ.data || []).map((m: ChatMessage) => {
                      const isMine = m.senderId === myUserId;
                  return (
                        <motion.div
                          key={m._id}
                          className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div
                            className={`max-w-[75%] px-3 py-2 rounded-lg shadow-sm ${
                              isMine
                                ? 'bg-[#d9fdd3] dark:bg-brand/20 text-gray-900 dark:text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                            }`}
                          >
                        <p className="text-sm whitespace-pre-wrap break-words">{m.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                              {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                      </div>
                        </motion.div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

                  {/* Input area */}
                  <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!text.trim() || sendMut.isPending}
                        className="w-10 h-10 rounded-full bg-[#00a884] text-white flex items-center justify-center hover:bg-[#00a884]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
              </div>
            </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">💬</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Select a chat to start messaging
                    </p>
              </div>
              </div>
          )}
        </section>
        
          </div>
      </div>
    </Layout>
    </>
  );
}
