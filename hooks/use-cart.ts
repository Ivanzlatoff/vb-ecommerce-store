import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product } from "@/types";


interface CartProps {
  items: Product[];
  addItem: (data: Product & {quantity: string}) => void;
  updateItem: (data: Product & {quantity: string}) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartProps>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast("Товар уже в кошику.")
      }

      set({ items: [...get().items, {...data}] });
      toast.success("Товар додано в кошик.");
    },
    updateItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);
      if (existingItem) {
        existingItem.quantity = data.quantity
      } 

      set({ items: [...get().items.filter((item) => item.id !== data.id)] });
      if (existingItem) {
        set({ items: [...get().items, existingItem] });
      }
      toast.success("Кількість оновлено.")
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success("Товар видалено з кошика.");
    },
    removeAll: () => set({ items: [] }),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart;