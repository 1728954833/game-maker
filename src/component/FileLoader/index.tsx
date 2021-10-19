import './index.less';
import { Button, message, Input } from 'antd';
import Upload from '../Upload';
import PicturePreview from '../PicturePreview';
// import MusicPreview from '../MusicPreview';
import { useState, useEffect } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { Resource, Resources } from '../../store/file';
import cn from 'classnames';
import useLocalStore from '../../hook/useLocalStore';
import { UploadFile } from 'antd/lib/upload/interface';
import { cloneDeep } from 'lodash';
import { useStore } from '../../context/StoreContext';
import { observer } from 'mobx-react';

const BASE_URL = process.env.REACT_APP_POINT;
export interface IFileLoaderProps { }

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
    const [active, setActive] = useState<keyof Resources>('vertical-drawing');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { setLocal, getLocal } = useLocalStore<Resources>();
    const { resourceStore } = useStore();

    useEffect(() => {
        const files = getLocal('files');
        if (!files) return;
        resourceStore.init(files);
    }, [getLocal, resourceStore]);

    useEffect(() => {
        setFileList([]);
    }, [active]);

    const createFileItem = (file: UploadFile): Resource => {
        const res: FileResponse = file.response?.data;
        return {
            uid: file.uid,
            status: file.status,
            name: res?.filename.split('-')[1],
            url: res?.url,
            percent: file.percent,
        };
    };

    const mergeFileItem = (
        origin: Resource[],
        files: Resource[]
    ): Resource[] => {
        origin = cloneDeep(origin);
        files = cloneDeep(files);
        const originUid = origin.map(o => o.uid);
        files.forEach(file => {
            const idx = originUid.indexOf(file.uid);
            if (idx !== -1) return (origin[idx] = file);
            origin.push(file);
        });
        return origin;
    };

    const handleUpdate = (info: UploadChangeParam) => {
        const { fileList, file } = info;
        // 上传过程中同步file信息
        const fileItems: Resource[] = fileList.map(file =>
            createFileItem(file)
        );
        resourceStore.set(
            active,
            mergeFileItem(resourceStore.get(active), fileItems)
        );

        // 上传结束后存储file信息
        const { status } = file;
        if (status === 'done') {
            let files = getLocal('files') || resourceStore.default;
            setLocal('files', {
                ...files,
                [active]: resourceStore.get(active),
            });
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }

        setFileList(fileList);
    };

    const renderResource = () => {
        return resourceStore.resource[active].map(file => {
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
                        onClick={() => setActive(tab.value as keyof Resources)}
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
                    <Upload fileList={fileList} handleUpdate={handleUpdate} />
                </div>
                <div className="container">{renderResource()}</div>
                {/* <PicturePreview src={a} name={'傻女a'} /> */}
                {/* <MusicPreview name="123" src={b} /> */}
            </div>
        </div>
    );
};

export default observer(FileLoader);
