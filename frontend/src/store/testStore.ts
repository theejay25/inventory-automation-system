import { create } from 'zustand'

interface CounterStore {
  name: string;
  count: number;
  randInt: number;
  incrementAsync: () => Promise<void>;
  increment: () => void;
  decrement: () => void;
  randomize: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  name: 'jude',
  count: 0,
  randInt: Math.floor(10000 + Math.random() * 90000),
  incrementAsync: async () => {
      await new Promise(res => setTimeout(res, 1000))
      set((state) => ({ count: state.count + 1 }))
  },
  increment: () => set(
    (state) => ({ count: state.count + 1 })
),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  randomize: () => set(() => ({ randInt: Math.floor(10000 + Math.random() * 90000) }))
}))