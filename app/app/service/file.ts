import { Service } from 'egg';
import { FileStream } from '../../typings/app';
import * as sendToWormhole from 'stream-wormhole'
import { write } from 'await-stream-ready'
import * as path from 'path'
import * as fs from 'fs'

export default class FileService extends Service {
    public async uploadFile(stream: FileStream) {
        const filename = `[${Date.now()}]-${stream.filename}`;
        const target = path.join('app/public/uploads', filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await write(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err
        }

        return {
            url: '/public/uploads/' + filename,
            filename: filename
        }
    }
}
