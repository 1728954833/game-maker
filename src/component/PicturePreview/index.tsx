import './index.less';
import cn from 'classnames';
import { isUndefined } from 'lodash';
// import { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
export interface IPicturePreviewProps {
    name?: string;
    src?: string;
    percent?: number;
}

const PicturePreview: React.FC<
    IPicturePreviewProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
    const { canvasStore } = useStore();
    const { name, src, className, percent } = props;

    const handleDragStart = (e: React.DragEvent) => {
        if (percent) return;
        canvasStore.setDragResourceType('vertical-drawing');
        canvasStore.setDragging(true);
        e.dataTransfer.setData(
            'picture',
            JSON.stringify({
                name,
                src,
                type: 'img',
            })
        );
    };

    const handleDragEnd = (e: React.DragEvent) => {
        canvasStore.setDragging(false);
    };

    return (
        <div
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable
            className={cn('picture-preview', className)}
        >
            {isUndefined(percent) ? (
                <>
                    <img
                        draggable={false}
                        className="container-box"
                        src={src}
                        alt={name}
                    />
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
