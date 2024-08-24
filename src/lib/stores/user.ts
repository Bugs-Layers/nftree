import { create } from "zustand"
import { UserResponseType } from "~/client/api"

interface UserStore {
  user: UserResponseType
  setUser: (newUser: UserResponseType) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: {} as UserResponseType,
  setUser: (newUser: UserResponseType) => set({ user: newUser })
}))