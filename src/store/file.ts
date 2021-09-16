import { makeAutoObservable, toJS } from 'mobx'

export interface Resource {
    uid?: string
    name?: string,
    url?: string,
    percent?: number,
    status?: 'error' | 'success' | 'done' | 'uploading' | 'removed'
}

export type Resources = {
    'sound-effect': Resource[]
    'voice': Resource[]
    'button': Resource[]
    'background': Resource[]
    'vertical-drawing': Resource[]
    'music': Resource[]
    'avatar': Resource[]
    'other': Resource[]
}

export type ResourceType = keyof Resources

class ResourceStore {
    public _resource: Resources = {
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

    get default(): Resources {
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

    get resource(): Resources {
        return toJS(this._resource)
    }

    init(resource: Resources) {
        this._resource = resource
    }

    set(type: ResourceType, resource: Resource[]) {
        this._resource[type] = resource
    }

    reset(type: ResourceType) {
        this._resource[type] = []
    }

    get(type: ResourceType): Resource[] {
        return toJS(this._resource[type])
    }
}

export default ResourceStore