import './index.less';
export interface IPicturePreviewProps {
    name: string;
    src: string;
}

const PicturePreview: React.FC<IPicturePreviewProps> = props => {
    const { name, src } = props;
    return (
        <div className="picture-preview">
            <img className="picture" src={src} alt={name} />
            <span className="picture-text">{name}</span>
        </div>
    );
};

export default PicturePreview;
