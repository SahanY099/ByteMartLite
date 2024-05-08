import superjson from "superjson";
import { PersistStorage } from "zustand/middleware";

export const getPersistStorageHandler = <T>(): PersistStorage<T> => ({
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
});
