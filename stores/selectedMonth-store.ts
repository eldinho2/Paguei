import { create } from "zustand";

export const useSelectedMonth = create((set) => ({
  month: 0,
  updateSelecteMonth: (month: number) => set({ month })
}));
 