import './index.less';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import useVideo from '../../hook/useVideo';
import { formatTimeLine } from '../../util/format';
export interface IMusicPreviewProps {
    name: string;
    src: string;
}

const MusicPreview: React.FC<IMusicPreviewProps> = props => {
    const { src, name } = props;
    const { rePlay, pause, media, mediaState } = useVideo({
        src,
        type: 'audio',
        hidden: true,
    });

    return (
        <div className="music-preview">
            <span className="music-preview-title">{name}</span>
            <div className="music-preview-right">
                <span>{formatTimeLine(mediaState.duration)}</span>
                {mediaState.paused ? (
                    <PlayCircleOutlined className="play" onClick={rePlay} />
                ) : (
                    <PauseCircleOutlined className="pause" onClick={pause} />
                )}
                {media}
            </div>
        </div>
    );
};

export default MusicPreview;
