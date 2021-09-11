import { makeAutoObservable } from 'mobx'
class CounterStore {
    count = 10

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    increment() {
        this.count++
    }

    reset() {
        this.count = 0
    }
}

export default CounterStore