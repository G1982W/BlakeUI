import { create } from "zustand";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup?: boolean;
  members?: number;
  status?: "online" | "offline" | "away";
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  senderName?: string;
  timestamp: string;
}

interface ChatStore {
  activeChatId: string;
  activeTab: "personal" | "groups";
  mobileDrawerOpen: boolean;
  contacts: Contact[];
  groups: Contact[];
  messages: Record<string, Message[]>;
  setActiveChatId: (id: string) => void;
  setActiveTab: (tab: "personal" | "groups") => void;
  setMobileDrawerOpen: (open: boolean) => void;
  sendMessage: (chatId: string, content: string) => void;
}

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      sender: "other",
      senderName: "Shannon",
      content:
        "I think you should go for it. You're more than capable and it sounds like a great opportunity for growth.",
      timestamp: "07:31 AM"
    },
    {
      id: "m2",
      sender: "user",
      content:
        "It's a bigger company and a more challenging role. I'm worried it might be too much to handle.",
      timestamp: "07:35 AM"
    },
    {
      id: "m3",
      sender: "user",
      content: "Thanks, I needed that encouragement. I'll start working on my application tonight.",
      timestamp: "07:36 AM"
    },
    {
      id: "m4",
      sender: "other",
      senderName: "Shannon",
      content: "Anytime! Let me know if you need any help with your resume or cover letter.",
      timestamp: "07:38 AM"
    },
    {
      id: "m5",
      sender: "user",
      content: "Will do. Appreciate it!",
      timestamp: "07:39 AM"
    }
  ],
  "2": [
    {
      id: "m1",
      sender: "other",
      senderName: "Jessica",
      content: "Hey! Are you coming to the trip next weekend?",
      timestamp: "05:20 PM"
    },
    {
      id: "m2",
      sender: "user",
      content: "Yes, I'm planning to! What should I bring?",
      timestamp: "05:33 PM"
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Jessica",
      content: "Perfect. I'll pack the camping gear, you bring the food supplies.",
      timestamp: "05:39 PM"
    }
  ],
  "3": [
    {
      id: "m1",
      sender: "user",
      content: "Hey Arlene, did you finish the report?",
      timestamp: "03:40 PM"
    },
    {
      id: "m2",
      sender: "other",
      senderName: "Arlene",
      content: "Okay, Thanks 👋",
      timestamp: "03:49 PM"
    }
  ],
  "4": [
    {
      id: "m1",
      sender: "other",
      senderName: "Max",
      content: "We should catch up soon, it's been a while!",
      timestamp: "01:50 PM"
    },
    {
      id: "m2",
      sender: "user",
      content: "Absolutely, how about next week?",
      timestamp: "01:57 PM"
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Max",
      content: "I'd love that! Let's set something up.",
      timestamp: "01:59 PM"
    }
  ],
  "5": [
    {
      id: "m1",
      sender: "user",
      content: "Sorry for the late reply, been swamped.",
      timestamp: "02:50 AM"
    },
    {
      id: "m2",
      sender: "other",
      senderName: "Jeremiah",
      content: "No problem. Got it sorted 😬",
      timestamp: "02:59 AM"
    }
  ],
  "6": [
    {
      id: "m1",
      sender: "other",
      senderName: "Camila",
      content: "I keep forgetting to reply to emails on time.",
      timestamp: "10:10 PM"
    },
    {
      id: "m2",
      sender: "user",
      content: "Same here honestly.",
      timestamp: "10:15 PM"
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Camila",
      content: "True! I'll be more careful from now on.",
      timestamp: "10:19 PM"
    }
  ],
  g1: [
    {
      id: "m1",
      sender: "other",
      senderName: "Shannon",
      content: "Hey team, the new mockups are ready for review.",
      timestamp: "09:15 AM"
    },
    {
      id: "m2",
      sender: "other",
      senderName: "Max",
      content: "Looks great! I left some comments in Figma.",
      timestamp: "09:22 AM"
    },
    {
      id: "m3",
      sender: "user",
      content: "I'll take a look this afternoon and share my thoughts.",
      timestamp: "09:45 AM"
    }
  ],
  g2: [
    {
      id: "m1",
      sender: "other",
      senderName: "Jessica",
      content: "Sprint review is at 3 PM today. Don't forget!",
      timestamp: "08:00 AM"
    },
    {
      id: "m2",
      sender: "user",
      content: "On it, I'll have the demo ready.",
      timestamp: "08:10 AM"
    }
  ],
  g3: [
    {
      id: "m1",
      sender: "other",
      senderName: "Arlene",
      content: "Anyone up for coffee after standup? ☕",
      timestamp: "10:00 AM"
    },
    {
      id: "m2",
      sender: "user",
      content: "Always 🙋",
      timestamp: "10:03 AM"
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Camila",
      content: "Count me in!",
      timestamp: "10:05 AM"
    }
  ]
};

export const useChatStore = create<ChatStore>((set) => ({
  activeChatId: "1",
  activeTab: "personal",
  mobileDrawerOpen: false,

  contacts: [
    {
      id: "1",
      name: "Shannon Baker",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Will do. Appreciate it!",
      timestamp: "07:39 AM",
      unread: 0,
      status: "online"
    },
    {
      id: "2",
      name: "Jessica Wells",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      lastMessage: "Perfect. I'll pack the camping gear.",
      timestamp: "05:39 PM",
      unread: 2,
      status: "away"
    },
    {
      id: "3",
      name: "Arlene Pierce",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      lastMessage: "Okay, Thanks 👋",
      timestamp: "03:49 PM",
      unread: 0,
      status: "offline"
    },
    {
      id: "4",
      name: "Max Alexander",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      lastMessage: "I'd love that! Let's set something up.",
      timestamp: "01:59 PM",
      unread: 0,
      status: "online"
    },
    {
      id: "5",
      name: "Jeremiah Minsk",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      lastMessage: "No problem. Got it sorted 😬",
      timestamp: "02:59 AM",
      unread: 0,
      status: "offline"
    },
    {
      id: "6",
      name: "Camila Simmons",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      lastMessage: "True! I'll be more careful.",
      timestamp: "10:19 PM",
      unread: 0,
      status: "online"
    }
  ],

  groups: [
    {
      id: "g1",
      name: "Design Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=256&h=256&fit=crop&auto=format",
      lastMessage: "I'll take a look this afternoon.",
      timestamp: "09:45 AM",
      unread: 0,
      isGroup: true,
      members: 6
    },
    {
      id: "g2",
      name: "Project Alpha",
      avatar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=256&h=256&fit=crop&auto=format",
      lastMessage: "On it, I'll have the demo ready.",
      timestamp: "08:10 AM",
      unread: 3,
      isGroup: true,
      members: 9
    },
    {
      id: "g3",
      name: "Coffee Corner ☕",
      avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=256&h=256&fit=crop&auto=format",
      lastMessage: "Count me in!",
      timestamp: "10:05 AM",
      unread: 0,
      isGroup: true,
      members: 12
    }
  ],

  messages: initialMessages,

  setActiveChatId: (id) => {
    set((state) => {
      const contacts = state.contacts.map((c) => (c.id === id ? { ...c, unread: 0 } : c));
      const groups = state.groups.map((g) => (g.id === id ? { ...g, unread: 0 } : g));
      return { activeChatId: id, contacts, groups, mobileDrawerOpen: true };
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setMobileDrawerOpen: (open) => set({ mobileDrawerOpen: open }),

  sendMessage: (chatId, content) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content,
      timestamp
    };

    set((state) => {
      const existing = state.messages[chatId] ?? [];
      const contacts = state.contacts.map((c) =>
        c.id === chatId ? { ...c, lastMessage: content, timestamp } : c
      );
      const groups = state.groups.map((g) =>
        g.id === chatId ? { ...g, lastMessage: content, timestamp } : g
      );
      return {
        messages: { ...state.messages, [chatId]: [...existing, newMessage] },
        contacts,
        groups
      };
    });
  }
}));
