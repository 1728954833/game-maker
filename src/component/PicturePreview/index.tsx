import './index.less';
import cn from 'classnames';
import { isUndefined } from 'lodash';
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
            {isUndefined(percent) ? (
                <>
                    <img className="container-box" src={src} alt={name} />
                    <span className="container-text">{name}</span>
                </>
            ) : (
                <>
                    <span className="container-box">
                        {percent === 100 ? '上传完成' : `上传中...`}
                    </span>
                    <span className="container-text">
                        {percent === 100 ? '' : `${Math.floor(percent)}%`}
                    </span>
                    <p
                        style={{
                            width: `${percent}%`,
                            color: 'transparent',
                        }}
                        className="picture-upload-progress"
                    ></p>
                </>
            )}
        </div>
    );
};

export default PicturePreview;
