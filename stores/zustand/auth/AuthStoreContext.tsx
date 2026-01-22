"use client";

import { createContext, useContext, useState } from "react";
import { authStore, AuthStoreAction, AuthStoreState } from "./authStore";
import { StoreApi, useStore } from "zustand";
import { IAuthUser } from "@/types";

const AuthStoreContext = createContext<StoreApi<
  AuthStoreState & AuthStoreAction
> | null>(null);

interface AuthStoreProviderProps extends React.PropsWithChildren {
  user?: IAuthUser | undefined;
}

export function AuthStoreProvider({ children, user }: AuthStoreProviderProps) {
  const [store] = useState<StoreApi<AuthStoreState & AuthStoreAction>>(() =>
    authStore(user)
  );

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(
  selector: (state: AuthStoreState & AuthStoreAction) => T
) {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error("AuthStoreProvider is not found");
  }
  return useStore(store, selector);
}
