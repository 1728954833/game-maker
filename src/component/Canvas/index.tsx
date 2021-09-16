import { observer } from 'mobx-react';
import { useStore } from '../../context/StoreContext';
import './index.less';
export interface ICanvasProps {}

// 拖拽行为
// 1. 当拖拽资源进入被拖拽对象会根据拖拽对象类型产生不同行为
// 2. 当释放资源会添加资源进入全局对象同时触发绘制在UI
// 拖拽过程是否需要辅助线???

const Canvas: React.FC<ICanvasProps> = props => {
    const { canvasStore } = useStore();

    const handleDragEnter = () => {
        console.log('啊 有东西进来了');
    };

    const handleDrop = (e: React.DragEvent) => {
        const data = JSON.parse(e.dataTransfer.getData('picture'));
        canvasStore.add(data);
        console.log(data);
        console.log('释放');
    };

    const handleDragOver = (e: React.DragEvent) => {
        // 只有在这里调用了e.preventDefault()时handleDrop才会生效
        e.preventDefault();
        console.log('有东西在乱窜');
    };

    const handleDragLeave = () => {
        console.log('清理东西');
    };

    const renderCanvas = () => {
        const components = canvasStore._drawComponents;
        return components.map(item => {
            if (item.type === 'img') {
                return <img src={item.src} alt={item.name} />;
            }
            return null;
        });
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="canvas"
        >
            {renderCanvas()}
        </div>
    );
};

export default observer(Canvas);
