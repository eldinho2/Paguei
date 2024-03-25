import { create } from "zustand";

interface ISelectedYear {
  year: number;
  updateSelecteYear: (year: number) => void;
}

export const useSelectedYear = create<ISelectedYear>((set) => ({
  year: new Date().getFullYear(),
  updateSelecteYear: (year: number) => set({ year })
}));
