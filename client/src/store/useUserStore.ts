import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: { id: number; name: string } | null;
  setUser: (user: { id: number; name: string }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
