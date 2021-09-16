
import { useRef } from 'react';

function useSingleton(callback: () => void) {
    const called = useRef(false);
    if (called.current) return;
    callback();
    called.current = true;
}

export default useSingleton;