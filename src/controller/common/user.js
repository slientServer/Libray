const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {

  async getAction () {
    let userInfo = await this.ctx.session('user') || {};
    this.success(Object.assign({}, {
      username: userInfo.username,
      employeeid: userInfo.employeeid,
      gender: userInfo.gender,
      location: userInfo.location,
      phone: userInfo.phone,
      nickname: userInfo.nickname,
      wechat: userInfo.wechat
    }));
  }
};
