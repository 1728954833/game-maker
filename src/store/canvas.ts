import { makeAutoObservable, toJS } from 'mobx'

interface Component {

}

class CanvasStore {
    public _drawComponents: Component[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get drawComponents(): Component[] {
        return toJS(this._drawComponents)
    }

    add(component: Component) {
        this._drawComponents.push(component)
    }

    clear() {
        this._drawComponents = []
    }
}

export default CanvasStore