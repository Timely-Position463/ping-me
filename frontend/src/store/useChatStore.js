import { create } from "zustand";
import { api } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser:(selectedUser)=>set({selectedUser}),
}));
