import './index.less';
import { Button } from 'antd';
import PicturePreview from '../PicturePreview';
export interface IFileLoaderProps {}

const tabs = [
    {
        label: '音效',
        value: 'sound-effect',
    },
    {
        label: '语音',
        value: 'voice',
    },
    {
        label: '按钮',
        value: 'button',
    },
    {
        label: '背景',
        value: 'background',
    },
    {
        label: '立绘',
        value: 'vertical-drawing',
    },
    {
        label: '音乐',
        value: 'music',
    },
    {
        label: '头像',
        value: 'avatar',
    },
    {
        label: '其他',
        value: 'other',
    },
];

const FileLoader: React.FC<IFileLoaderProps> = props => {
    return (
        <div className="file-loader">
            <div className="tabs flex flex-wrap justify-around py-2">
                {tabs.map(tab => (
                    <Button className="mb-1" key={tab.value}>
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="tab-contents p-2">
                <PicturePreview />
            </div>
        </div>
    );
};

export default FileLoader;
