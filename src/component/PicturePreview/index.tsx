import './index.less';
import cn from 'classnames';
export interface IPicturePreviewProps {
    name: string;
    src: string;
}

const PicturePreview: React.FC<
    IPicturePreviewProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
    const { name, src, className } = props;
    return (
        <div className={cn('picture-preview', className)}>
            <img className="picture" src={src} alt={name} />
            <span className="picture-text">{name}</span>
        </div>
    );
};

export default PicturePreview;
