import { useCallback } from 'react';

interface LocalStoreHook<T> {
    setLocal: (key: string, value: T) => void
    getLocal: (key: string) => T | false
    removeLocal: (key: string) => void
}

const useLocalStore = <T>(): LocalStoreHook<T> => {

    const setLocal = useCallback((key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [])

    const getLocal = useCallback((key: string): T | false => {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : false;
    }, [])

    const removeLocal = useCallback((key: string) => {
        localStorage.removeItem(key);
    }, [])

    return {
        setLocal,
        getLocal,
        removeLocal,
    }
}

export default useLocalStore