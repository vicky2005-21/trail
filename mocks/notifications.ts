export const NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    username: "Sarah Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    message: "liked your post",
    timeAgo: "2m ago",
    read: false,
    postId: 1,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    userId: 2,
  },
  {
    id: 2,
    type: "comment",
    username: "Michael Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    message: 'commented on your post: "This looks amazing!"',
    timeAgo: "15m ago",
    read: false,
    postId: 3,
    userId: 3,
  },
  {
    id: 3,
    type: "follow",
    username: "Emily Rodriguez",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    message: "started following you",
    timeAgo: "1h ago",
    read: true,
    userId: 4,
  },
  {
    id: 4,
    type: "brew",
    username: "David Kim",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    message: 'invited you to a brew: "Coffee & Code Meetup"',
    timeAgo: "3h ago",
    read: false,
    brewId: 2,
    userId: 5,
  },
  {
    id: 5,
    type: "like",
    username: "Jessica Taylor",
    userAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    message: "and 5 others liked your post",
    timeAgo: "5h ago",
    read: true,
    postId: 2,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    userId: 6,
  },
  {
    id: 6,
    type: "comment",
    username: "Alex Wong",
    userAvatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
    message: 'replied to your comment: "Let\'s meet up next week!"',
    timeAgo: "1d ago",
    read: true,
    postId: 4,
    userId: 7,
  },
  {
    id: 7,
    type: "brew",
    username: "Sophia Martinez",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    message: 'is going to your brew: "Morning Coffee Chat"',
    timeAgo: "1d ago",
    read: true,
    brewId: 1,
    userId: 8,
  },
  {
    id: 8,
    type: "follow",
    username: "Ryan Patel",
    userAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    message: "started following you",
    timeAgo: "2d ago",
    read: true,
    userId: 9,
  },
  {
    id: 9,
    type: "like",
    username: "Olivia Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
    message: 'liked your memory: "Summer Beach Trip"',
    timeAgo: "3d ago",
    read: true,
    memoryId: 2,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    userId: 10,
  },
  {
    id: 10,
    type: "event",
    username: "Coffee & Connect",
    userAvatar:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop",
    message: 'New event near you: "Coffee Tasting Workshop"',
    timeAgo: "4d ago",
    read: true,
    eventId: 1,
    userId: 11,
  },
];
