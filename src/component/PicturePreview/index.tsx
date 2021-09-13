import './index.less';
import cn from 'classnames';
export interface IPicturePreviewProps {
    name?: string;
    src?: string;
    percent?: number;
}

const PicturePreview: React.FC<
    IPicturePreviewProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
    const { name, src, className, percent } = props;
    return (
        <div className={cn('picture-preview', className)}>
            {!percent ? (
                <>
                    <img className="container-box" src={src} alt={name} />
                    <span className="picture-text">{name}</span>
                </>
            ) : (
                <>
                    <div className="container-box">
                        <span>
                            {percent === 100 ? '上传完成' : `上传中...${Math.floor(percent)}%`}
                        </span>
                    </div>
                    <p
                        style={{
                            width: `${percent}%`,
                            color: 'transparent',
                        }}
                        className="picture-upload-progress"
                    >
                        placeholder
                    </p>
                </>
            )}
        </div>
    );
};

export default PicturePreview;
