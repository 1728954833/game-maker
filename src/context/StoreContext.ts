import { createContext, useContext } from 'react'
import CounterStore from '../store/counter';
import FileStore from '../store/file'
import CanvasStore from '../store/canvas'

interface Store {
    counterStore: CounterStore
    fileStore: FileStore
    canvasStore: CanvasStore
}

export const initStore = {
    counterStore: new CounterStore(),
    fileStore: new FileStore(),
    canvasStore: new CanvasStore()
}

export const StoreContext = createContext<Store>(initStore)

export const StoreProvider = StoreContext.Provider

export const useStore = () => useContext(StoreContext)