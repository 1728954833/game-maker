import { createContext, useContext } from 'react'
import CounterStore from '../store/counter';

interface Store {
    counterStore: CounterStore
}

export const initStore = {
    counterStore: new CounterStore()
}

export const StoreContext = createContext<Store>(initStore)

export const StoreProvider = StoreContext.Provider

export const useStore = () => useContext(StoreContext)