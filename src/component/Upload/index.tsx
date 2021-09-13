import './index.less';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload as AntUpload } from 'antd';
import { DraggerProps, UploadChangeParam } from 'antd/lib/upload';

export interface IUploadProps {
    handleUpdate: (info: UploadChangeParam) => void;
}

const Upload: React.FC<IUploadProps> = props => {
    const { handleUpdate } = props;
    const dragProp: DraggerProps = {
        name: 'file',
        multiple: true,
        // directory: true,
        action: '/api/file/upload',
        showUploadList: false,
        onChange(info: UploadChangeParam) {
            handleUpdate && handleUpdate(info);
        },
    };

    return (
        <AntUpload {...dragProp}>
            <Button icon={<CloudUploadOutlined />} type="primary">
                点击上传
            </Button>
        </AntUpload>
    );
};

export default Upload;
