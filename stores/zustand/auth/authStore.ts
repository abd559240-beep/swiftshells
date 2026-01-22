import { env } from "@/lib/configs/env.config";
import { IAuthUser } from "@/types";
import { createStore } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface AuthStoreState {
  user: IAuthUser | undefined;
}

export interface AuthStoreAction {
  addAllData: (payload: AuthStoreState) => void;
  addUserData: (payload: IAuthUser) => void;
  clearAllData: () => void;
}

export function authStore(userData: IAuthUser | undefined) {
  return createStore<AuthStoreState & AuthStoreAction>()(
    devtools(
      immer(
        combine<AuthStoreState, AuthStoreAction>(
          {
            user: userData,
          },
          (set) => ({
            addAllData: (payload) => {
              set((state) => {
                const user = payload.user;

                if (user) {
                  state.user = user;
                }

                return state;
              });
            },
            addUserData: (payload) => {
              set((state) => {
                state.user = payload;
                return state;
              });
            },
            clearAllData: () => {
              set((state) => {
                state.user = undefined;
                return state;
              });
            },
          })
        )
      ),

      {
        name: "auth-store",
        store: "auth-store",
        enabled: env.NEXT_PUBLIC_NODE_ENV === "development",
      }
    )
  );
}
