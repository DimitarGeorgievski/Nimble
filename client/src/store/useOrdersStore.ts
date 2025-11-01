import { create } from "zustand";

interface OrderState {}

export const useOrdersStore = create<OrderState>((set) => ({}));
