
import { useCallback, useState } from 'react';

const useAsync = <U, T>(asyncFunction: any) => {
    // 设置三个异步逻辑相关的 state
    const [data, setData] = useState<U | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<T | null>(null);
    const execute = useCallback(() => {
        setLoading(true);
        setData(null);
        setError(null);
        return asyncFunction()
            .then((response: U) => {
                setData(response);
                setLoading(false);
            })
            .catch((error: T) => {
                setError(error);
                setLoading(false);
            });
    }, [asyncFunction]);

    return { execute, loading, data, error };
};