const Controller = require('egg').Controller;
/**
* @Controller user
*/
class UserController extends Controller {
    constructor(ctx) {
        super(ctx);//调用父类的构造函数
    }
    /**
     * @Summary 创建用户
     * @Description 记录用户信息：用户名/密码/电话号
     * @Router post /api/user
     * @Request body createUserRequest *body
     * @Response 200 baseResponse 创建用户成功
     */
    async create() {
        const { ctx, service } = this;
        // 校验 `ctx.request.body` 是否符合我们预期的格式
        // 如果参数校验未通过，将会抛出一个 status = 422 的异常
        // ctx.validate(createRule, ctx.request.body);
        // ctx.validate(ctx.rule.createUserRequest, ctx.request.body);
        ctx.validate(ctx.rule.createUserRequest);
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const res = await service.user.create(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }


    /**
     * @summary 删除单个用户
     * @description 删除单个用户
     * @router delete /api/user/{id}
     * @request path string *id eg:1 用户ID
     * @response 200 baseResponse 创建成功
     */
    async destroy() {
        const { ctx, service } = this
        // 校验参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        await service.user.destroy(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    /**
     * @summary 修改用户
     * @description 获取用户信息
     * @router put /api/user/
     * @response 200 baseResponse 创建成功
     * @ignore
     */
    async update() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(ctx.rule.createUserRequest)
        // 组装参数
        const { id } = ctx.params
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        await service.user.update(id, payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    /**
     * @summary 获取单个用户
     * @description 获取用户信息
     * @router get /api/user/{id}
     * @request url baseRequest
     * @response 200 baseResponse 创建成功
     */
    async show() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        const res = await service.user.show(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }


    /**
     * @summary 获取所有用户(分页/模糊)
     * @description 获取用户信息
     * @router get /api/user
     * @request query integer *currentPage eg:1 当前页
     * @request query integer *pageSize eg:10 单页数量
     * @request query string search eg: 搜索字符串
     * @request query boolean isPaging eg:true 是否需要翻页
     * @response 200 baseResponse 创建成功
     */
    async index() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.query
        // 调用 Service 进行业务处理
        const res = await service.user.index(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 删除所选用户
     * @description 获取用户信息
     * @router delete /api/user/{id}
     * @request path string *id
     * @response 200 baseResponse 创建成功
     */
    async removes() {
        const { ctx, service } = this
        // 组装参数
        // const payload = ctx.queries.id
        const { id } = ctx.request.body
        const payload = id.split(',') || []
        // 调用 Service 进行业务处理
        const result = await service.user.removes(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}
module.exports = UserController;