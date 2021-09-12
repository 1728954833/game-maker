import { Controller } from 'egg';

export interface BaseResponse {
    message?: string
    displayMessage?: string
    data?: any
    status?: string
}

export default class BaseController extends Controller {
    success(data?: BaseResponse) {
        const defaultData = {
            message: '',
            displayMessage: '',
            data: '',
            status: 200
        }
        this.ctx.body = Object.assign(defaultData, data)
    }

    error(data?: BaseResponse) {
        const defaultData = {
            message: '服务器错误',
            displayMessage: '服务器错误',
            data: '',
            status: 500
        }
        this.ctx.status = 500
        this.ctx.body = Object.assign(defaultData, data)
    }
}
