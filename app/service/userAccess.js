'use strict'
const Service = require('egg').Service
class UserAccessService extends Service {

    async login(payload) {
        const { ctx, service } = this
        //把用户从数据库中取出
        const user = await service.user.findByMobile(payload.mobile)

        if (!user) { // 数据库中没有这个用户
            ctx.throw(404, 'user not found')
        }
        //比较密码
        let verifyPsw = await ctx.compare(payload.password, user.password)

        if (!verifyPsw) {
            ctx.throw(404, 'user password is error')
        }
        // 生成Token
        return { token: await service.actionToken.apply(user._id) }
    }

    async logout() {

    }

    async current() {
        const { ctx, service } = this
        // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id

        const user = await service.user.find(_id) // 根据_id查找到用户
        if (!user) {
            ctx.throw(404, 'user is not found')
        }
        user.password = 'How old are you?'
        return user
    }
}
module.exports = UserAccessService