import { create } from "zustand";

interface ISelectedMonth {
  month: number;
  updateSelecteMonth: (month: number) => void;
}

export const useSelectedMonth = create<ISelectedMonth>((set) => ({
  month: 0,
  updateSelecteMonth: (month: number) => set({ month })
}));
 