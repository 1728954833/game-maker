import { makeAutoObservable, toJS } from 'mobx'
import { ResourceType } from './file'

interface Component {
    id: number
    width: number
    height: number
    src: string
    name: string
    type: string
}

class CanvasStore {
    private _drawComponents: Component[] = []
    private _dragging: boolean = false
    private _dragResourceType: ResourceType = 'vertical-drawing'

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get drawComponents(): Component[] {
        return toJS(this._drawComponents)
    }

    get dragging() {
        return this._dragging
    }

    get dragResourceType() {
        return this._dragResourceType
    }

    setDragResourceType(type: ResourceType) {
        this._dragResourceType = type
    }

    setDragging(flag: boolean) {
        this._dragging = flag
    }

    add(component: Component) {
        component.id = new Date().getTime()
        this._drawComponents.push(component)
    }

    clear() {
        this._drawComponents = []
    }
}

export default CanvasStore