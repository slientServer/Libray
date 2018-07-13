const BaseRest = require('./rest.js');
const Geetest = require('gt3-sdk');

module.exports = class extends BaseRest {
  constructor(ctx){
    super(ctx);
  }

  async getAction () {
    // 向极验申请每次验证所需的challenge
    let captcha = new Geetest({
      geetest_id: this.ctx.config('geetest').geetest_id,
      geetest_key: this.ctx.config('geetest').geetest_key
    });
    let res = await captcha.register({
      client_type: 'unknown',
      ip_address: 'unknown'
    });
    if (!res.success) {
      // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
      // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

      // 为以防万一，你可以选择以下两种方式之一：

      // 1. 继续使用极验提供的failback备用方案
      await this.session('fallback', true);
      this.ctx.success(res);

      // 2. 使用自己提供的备用方案
      // todo

    } else {
      // 正常模式
      // req.session.fallback = false;
      this.ctx.success(res);
    }
  }
};
