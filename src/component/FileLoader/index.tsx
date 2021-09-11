import './index.less';
import { Button } from 'antd';
import PicturePreview from '../PicturePreview';
import MusicPreview from '../MusicPreview';
import imgPath from 'C:/Users/dream/Desktop/朋友(Friends)-6_爱给网_aigei_com/bs_yk01d.png';

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
                <PicturePreview src={imgPath} name={'傻女a'} />
                <MusicPreview name="123" src={'1.mp3'} />
            </div>
        </div>
    );
};

export default FileLoader;
