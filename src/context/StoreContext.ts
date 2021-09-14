import { createContext, useContext } from 'react'
import CounterStore from '../store/counter';
import FileStore from '../store/file'

interface Store {
    counterStore: CounterStore
    fileStore: FileStore
}

export const initStore = {
    counterStore: new CounterStore(),
    fileStore: new FileStore()
}

export const StoreContext = createContext<Store>(initStore)

export const StoreProvider = StoreContext.Provider

export const useStore = () => useContext(StoreContext)