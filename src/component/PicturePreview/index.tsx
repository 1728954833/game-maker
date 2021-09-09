import './index.less';
import imgPath from 'C:/Users/dream/Desktop/朋友(Friends)-6_爱给网_aigei_com/bs_yk01d.png';
export interface IPicturePreviewProps {}

const PicturePreview: React.FC<IPicturePreviewProps> = props => {
    return (
        <div className="picture-preview">
            <img className="picture" src={imgPath} alt="少女-A" />
            <span className="picture-text">少女-A</span>
        </div>
    );
};

export default PicturePreview;
