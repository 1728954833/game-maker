import { createContext, useContext } from 'react'
import CounterStore from '../store/counter';
import ResourceStore from '../store/file'
import CanvasStore from '../store/canvas'

interface Store {
    counterStore: CounterStore
    resourceStore: ResourceStore
    canvasStore: CanvasStore
}

export const initStore = {
    counterStore: new CounterStore(),
    resourceStore: new ResourceStore(),
    canvasStore: new CanvasStore()
}

export const StoreContext = createContext<Store>(initStore)

export const StoreProvider = StoreContext.Provider

export const useStore = () => useContext(StoreContext)