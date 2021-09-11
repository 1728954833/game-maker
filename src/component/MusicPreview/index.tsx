import './index.less';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useCallback, useRef } from 'react';
export interface IMusicPreviewProps {}

const MusicPreview: React.FC<IMusicPreviewProps> = props => {
    const videoInstance = useRef<HTMLVideoElement>(null);

    const play = useCallback(() => {
        videoInstance.current?.play();
    }, [videoInstance]);

    return (
        <div className="music-preview">
            <span className="music-preview-title">小音乐</span>
            <div className="music-preview-right">
                <span>0:01</span>
                <PlayCircleOutlined className="play" onClick={play} />
                <video
                    ref={videoInstance}
                    hidden
                    src="https://sp1.baidu.com/-rM1hT4a2gU2pMbgoY3K/gettts?lan=uk&text=video&spd=2&source=alading"
                >
                    你的浏览器不支持video标签
                </video>
            </div>
        </div>
    );
};

export default MusicPreview;
