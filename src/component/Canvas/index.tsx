import { observer } from 'mobx-react';
import './index.less';
export interface ICanvasProps {}

const Canvas: React.FC<ICanvasProps> = props => {
    return <div className='canvas'>123</div>;
};

export default observer(Canvas);
