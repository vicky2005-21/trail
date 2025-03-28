/**
 * Mock data for chat previews
 */
export const chatPreviews = [
  {
    id: '1',
    userName: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey there! How are you doing today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    userName: 'Morgan Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Are we still meeting tomorrow at the cafe?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    userName: 'Taylor Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'I sent you the photos from our trip!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    unreadCount: 5,
    online: true,
  },
  {
    id: '4',
    userName: 'Jordan Patel',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'Thanks for the recommendation!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    unreadCount: 0,
    online: false,
  },
  {
    id: '5',
    userName: 'Casey Williams',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Can you send me the address?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    unreadCount: 0,
    online: false,
  },
];

/**
 * Get a specific chat by ID
 */
export const getChatById = (id: string) => {
  return chatPreviews.find(chat => chat.id === id);
};

/**
 * Get all chats
 */
export const getAllChats = () => {
  return chatPreviews;
};

export default {
  chatPreviews,
  getChatById,
  getAllChats,
};
