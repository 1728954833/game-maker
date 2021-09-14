import { makeAutoObservable } from 'mobx'

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
    public files: Files = {
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

    addFile(type: keyof Files, file: FileItem) {
        this.files[type].push(file)
    }

    removeFile(type: keyof Files, name: string) {
        this.files[type].filter(file => file.name !== name)
    }

    reset(type: keyof Files) {
        this.files[type] = []
    }

    getFile(type: keyof Files): FileItem[] {
        return this.files[type]
    }
}

export default FileStore