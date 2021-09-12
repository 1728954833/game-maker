import BaseController from './base'


export default class FileController extends BaseController {
    public async upload() {
        try {
            const stream = await this.ctx.getFileStream();
            const fileInfo = await this.ctx.service.file.uploadFile(stream);
            this.success({
                data: fileInfo
            });
        } catch (err) {
            this.error()
        }
    }
}
