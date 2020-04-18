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
        const { ctx } = this;
        // 校验 `ctx.request.body` 是否符合我们预期的格式
        // 如果参数校验未通过，将会抛出一个 status = 422 的异常
        // ctx.validate(createRule, ctx.request.body);
        // ctx.validate(ctx.rule.createUserRequest, ctx.request.body);
        ctx.validate(ctx.rule.createUserRequest);
        // 设置响应内容和响应状态码
        // testerr()
        // ctx.body = 'user ctrl'
        const res = {name: 'test'};
        ctx.helper.success({ctx, res})

    }
}
module.exports = UserController;