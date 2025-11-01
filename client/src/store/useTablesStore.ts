import { create } from "zustand";

interface TableState {}

export const useTablesStore = create<TableState>((set) => ({}));
