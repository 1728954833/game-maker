import { makeAutoObservable, toJS } from 'mobx'

export interface FileItem {
    uid?: string
    name?: string,
    url?: string,
    percent?: number,
    status?: 'error' | 'success' | 'done' | 'uploading' | 'removed'
}

export type Files = {
    'sound-effect': FileItem[]
    'voice': FileItem[]
    'button': FileItem[]
    'background': FileItem[]
    'vertical-drawing': FileItem[]
    'music': FileItem[]
    'avatar': FileItem[]
    'other': FileItem[]
}

class FileStore {
    public _files: Files = {
        'sound-effect': [],
        'voice': [],
        'button': [],
        'background': [],
        'vertical-drawing': [],
        'music': [],
        'avatar': [],
        'other': []
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get default(): Files {
        return {
            'sound-effect': [],
            'voice': [],
            'button': [],
            'background': [],
            'vertical-drawing': [],
            'music': [],
            'avatar': [],
            'other': []
        }
    }

    get files(): Files {
        return toJS(this._files)
    }

    init(files: Files) {
        this._files = files
    }

    set(type: keyof Files, files: FileItem[]) {
        this._files[type] = files
    }

    reset(type: keyof Files) {
        this._files[type] = []
    }

    get(type: keyof Files): FileItem[] {
        return toJS(this._files[type])
    }
}

export default FileStore