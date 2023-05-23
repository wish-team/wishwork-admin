import Cookies from 'js-cookie'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import type { StateStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { createPersistStorage } from './createPersistStorage'

export const storageName = 'wishwork-admin'

export const initialState: PersistedState = {
  loggedIn: false,
  token: undefined,
}
export const initialStateJSON = JSON.stringify(initialState)

export const CookieStorage = {
  getItem: (name) => {
    return Cookies.get(name) ?? null
  },
  setItem: (name, value) => {
    Cookies.set(name, value, { sameSite: 'strict', expires: 1 })
  },
  removeItem: (name) => {
    return Cookies.remove(name)
  },
} satisfies StateStorage

export interface PersistedState {
  token: string | undefined
  loggedIn: boolean
}

interface StoreInterface extends PersistedState {
  login: (token: string) => void
  logout: () => void
}

export type Store = ReturnType<typeof initializeStore>

const zustandContext = createContext<Store | null>(null)

export const Provider = zustandContext.Provider

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

export const initializeStore = (preloadedState: Partial<PersistedState>) => {
  return createStore<StoreInterface>()(
    persist(
      (set) => ({
        token: undefined,
        loggedIn: false,
        ...preloadedState,
        login: (token: string) =>
          set(() => ({
            token,
            loggedIn: true,
          })),
        logout: () =>
          set(() => ({
            token: undefined,
            loggedIn: false,
          })),
      }),
      {
        name: storageName,
        storage: createPersistStorage(() => CookieStorage),
        partialize: (state) => ({ token: state.token, loggedIn: state.loggedIn }),
      }
    )
  )
}
