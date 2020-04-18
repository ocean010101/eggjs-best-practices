const Service = require('egg').Service;
class UserService extends Service {
    /**
     * 创建用户
     * @param {*} payload 
     */
    async create(payload) {
        console.log('payload=', payload);
        // 密码加密
        payload.password = await this.ctx.genHash(payload.password);//给密码加密
        return this.ctx.model.User.create(payload);
    }
}
module.exports = UserService;