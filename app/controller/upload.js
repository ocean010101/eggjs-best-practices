

const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')
const Controller = require('egg').Controller

/**
 * @Controller 文件上传
 */
class UplaodController extends Controller {

    constructor(ctx) {
        super(ctx)
    }

    /**
     * @summary 上传单个文件
     * @description 上传单个文件
     * @router post /api/upload/single
     */
    async create() {
        const { ctx } = this;
        // 校验参数
        console.log("=====================");

        // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
        // 只支持上传一个文件。
        // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
        // 获取上传文件
        const stream = await ctx.getFileStream()
        // 所有表单字段都能通过 `stream.fields` 获取到
        // const filename = path.basename(stream.filename) // 文件名称
        const extname = path.extname(stream.filename).toLowerCase() // 文件扩展名称
        const uuid = (Math.random() * 999999).toFixed()
        //组装参数
        const target = path.join(this.config.baseDir, 'app/public/uploads',
            `${uuid}${extname}`)
        const writeStream = fs.createWriteStream(target)
        // 文件处理，上传到云存储等等
        try {
            await awaitWriteStream(stream.pipe(writeStream))
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream)
            throw err
        }
        // 调用 Service 进行业务处理
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}
module.exports = UplaodController