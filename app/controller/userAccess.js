const Controller = require('egg').Controller;
/**
* @Controller 用户鉴权
*/
class UserAccessController extends Controller {
    constructor(ctx) {
        super(ctx);//调用父类的构造函数
    }
    /**
     * @Summary 用户登入
     * @Description 用户登入
     * @Router post /auth/jwt/login
     * @Request body loginRequest *body
     * @Response 200 baseResponse 登录成功
     */
    async login() {
        const { ctx, service } = this;
        // 校验参数
        ctx.validate(ctx.rule.loginRequest);
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const res = await service.userAccess.login(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    /**
     * @Summary 用户登出
     * @Description 用户登出
     * @Router post /auth/jwt/logout
     * @Request body loginRequest *body
     * @Response 200 baseResponse 登出成功
     */
    async logout() {
        const { ctx, service } = this;
        // 调用 Service 进行业务处理
        await service.userAccess.logout()
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}
module.exports = UserAccessController;