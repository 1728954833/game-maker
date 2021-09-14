import './index.less';
import { Button, message, Input } from 'antd';
import Upload from '../Upload';
import PicturePreview from '../PicturePreview';
// import MusicPreview from '../MusicPreview';
import { useState, useEffect } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { FileItem, Files } from '../../store/file';
import cn from 'classnames';
import useLocalStore from '../../hook/useLocalStore';
import { UploadFile } from 'antd/lib/upload/interface';

const BASE_URL = process.env.REACT_APP_POINT;
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

export interface FileResponse {
    filename: string;
    url: string;
}

const FileLoader: React.FC<IFileLoaderProps> = props => {
    const [fileList, setFileList] = useState<FileItem[]>([]);
    const [active, setActive] = useState<keyof Files>('vertical-drawing');
    const { setLocal, getLocal } = useLocalStore<FileItem[]>();
    useEffect(() => {
        // TODO: 从本地加载数据到mobx
        const files = getLocal('files');
        setFileList(files || []);
    }, [getLocal]);

    const createFileItem = (file: UploadFile): FileItem => {
        const res: FileResponse = file.response?.data;
        return {
            uid: file.uid,
            status: file.status,
            name: res?.filename.split('-')[0],
            url: res?.url,
            percent: file.percent,
        };
    };

    const handleUpdate = (info: UploadChangeParam) => {
        // 上传过程中同步file信息
        const fileItem: FileItem[] = info.fileList.map(file =>
            createFileItem(file)
        );
        setFileList(fileItem);

        // 上传结束后存储file信息
        const { status } = info.file;
        if (status === 'done') {
            const files = getLocal('files');
            setLocal('files', [...files, createFileItem(info.file)]);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
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
                return (
                    <PicturePreview
                        key={file.uid}
                        className="tab-content-preview-picture"
                        src={BASE_URL + file.url!}
                        name={file.name}
                    />
                );
            }
            return null;
        });
    };

    return (
        <div className="file-loader">
            <div className="tabs flex flex-wrap justify-around py-2">
                {tabs.map(tab => (
                    <Button
                        onClick={() => setActive(tab.value as keyof Files)}
                        className={cn('mb-1 tab', {
                            active: active === tab.value,
                        })}
                        key={tab.value}
                    >
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
                {/* <PicturePreview src={a} name={'傻女a'} /> */}
                {/* <MusicPreview name="123" src={b} /> */}
            </div>
        </div>
    );
};

export default FileLoader;
