import Cookies from 'js-cookie'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { StoreApi } from 'zustand'
import create from 'zustand'
import createContext from 'zustand/context'
import type { StateStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

export const storageName = 'wishwork-admin'

export const initialState: PersistedState = { token: undefined, loggedIn: false }
export const initialStateJSON = JSON.stringify(initialState)

const CookieStorage: StateStorage = {
  getItem: (name) => {
    return Cookies.get(name) ?? null
  },
  setItem: (name, value) => {
    Cookies.set(name, value, { sameSite: 'strict', expires: 1 })
  },
  removeItem: (name) => {
    return Cookies.remove(name)
  },
}

export interface PersistedState {
  token: string | undefined
  loggedIn: boolean
}

interface StoreInterface extends PersistedState {
  login: (token: string) => void
  logout: () => void
}

const zustandContext = createContext<StoreApi<StoreInterface>>()

export const Provider = zustandContext.Provider

export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState: Partial<PersistedState>) => {
  return create<StoreInterface>()(
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
        getStorage: () => CookieStorage,
        partialize: (state) => ({ token: state.token, loggedIn: state.loggedIn }),
        serialize: (state) => compressToEncodedURIComponent(JSON.stringify(state)),
        deserialize: (str) =>
          JSON.parse(decompressFromEncodedURIComponent(str) ?? initialStateJSON),
      }
    )
  )
}
