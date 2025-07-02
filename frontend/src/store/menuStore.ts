import { create } from "zustand";

type store = {
    isOpen: boolean,
    close: () => void
    open: () => void;
    toggle: () => void
}

export const useMenuStore = create<store>((set: any) => ({
     isOpen: true,
     open: () => set({ isOpen: false }),
     close: () => set({ isOpen: true }),
     toggle: () => set((state: any) => ({ isOpen: !state.isOpen })),

}))