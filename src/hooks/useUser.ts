import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUser } from "~/common/model/user.model";

type UserState = {
  user: IUser;
  setUser: (user: IUser) => void;
  clearUser: () => void;
};

const initialUser: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  imageUrl: "",
  isVerify: false,
  roles: [],
  status: "",
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: initialUser,
      setUser: (user: IUser) =>
        set({
          user: user,
        }),

      clearUser: () => set({ user: initialUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
