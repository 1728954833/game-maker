import './index.less';
import { Button, message, Input } from 'antd';
import Upload from '../Upload';
import PicturePreview from '../PicturePreview';
import MusicPreview from '../MusicPreview';
import { useState, useEffect, useMemo } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

const BASE_URL = process.env.REACT_APP_POIN;
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

export interface fileInfo {
    filename: string;
    url: string;
}

const FileLoader: React.FC<IFileLoaderProps> = props => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        console.log(fileList);
    }, [fileList]);

    const handleUpdate = (info: UploadChangeParam) => {
        setFileList(info.fileList);
        const { status } = info.file;
        console.log(status, info.fileList);
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            // message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
        }
    };

    const renderResource = () => {
        return fileList.map(file => {
            if (file.status === 'uploading') {
                return (
                    <PicturePreview
                        className="tab-content-preview-picture"
                        key={file.uid}
                        percent={file.percent}
                    />
                );
            } else if (file.status === 'done') {
                const fileInfo: fileInfo = file.response.data;
                return (
                    <PicturePreview
                        key={file.uid}
                        className="tab-content-preview-picture"
                        src={BASE_URL + fileInfo.url}
                        name={fileInfo.filename}
                    />
                );
            }
        });
    };

    return (
        <div className="file-loader">
            <div className="tabs flex flex-wrap justify-around py-2">
                {tabs.map(tab => (
                    <Button className="mb-1 tab" key={tab.value}>
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="tab-contents p-2">
                <div className="flex justify-around w-full mb-2">
                    <Input
                        className="mr-3"
                        placeholder={'之后会在此使用搜索框'}
                    />
                    <Upload handleUpdate={handleUpdate} />
                </div>
                <div className="container">{renderResource()}</div>
                {/* <PicturePreview
                    // className="tab-content-preview-picture"
                    // src={`${BASE_URL}/public/uploads/[1631538431630]-bs_yk01h@.png`}
                    // name={'傻女a'}
                    percent={10}
                />
                <PicturePreview
                    // className="tab-content-preview-picture"
                    src={`${BASE_URL}/public/uploads/[1631543056354]-bs_yk02d.png`}
                    name={'傻女a'}
                    // percent={10}
                /> */}
                {/* <PicturePreview src={a} name={'傻女a'} /> */}
                {/* <MusicPreview name="123" src={b} /> */}
            </div>
        </div>
    );
};

export default FileLoader;
