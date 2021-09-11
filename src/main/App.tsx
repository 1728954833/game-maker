import WorkSpacePage from '../page/workspace';
import { observer } from 'mobx-react';
import { StoreProvider, initStore, useStore } from '../context/StoreContext';

function App() {
    const { counterStore } = useStore();
    return (
        <StoreProvider value={initStore}>
            {counterStore.count}
            <button onClick={() => counterStore.increment()}>increment</button>
            <button onClick={() => counterStore.reset()}>reset</button>
            <WorkSpacePage />
        </StoreProvider>
    );
}

export default observer(App);
