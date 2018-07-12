const BaseRest = require('./rest.js');
const Geetest = require('gt3-sdk');

module.exports = class extends BaseRest {
  const captcha = new Geetest({
    geetest_id: '48a6ebac4ebc6642d68c217fca33eb4d',
    geetest_key: '4f1c085290bec5afdc54df73535fc361'
  });

  getAction () {
    // 向极验申请每次验证所需的challenge
    captcha.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
      if (err) {
          think.logger.error("Captcha register failed:" + err);
          return;
      }

      if (!data.success) {
          // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
          // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

          // 为以防万一，你可以选择以下两种方式之一：

          // 1. 继续使用极验提供的failback备用方案
          req.session.fallback = true;
          res.send(data);

          // 2. 使用自己提供的备用方案
          // todo

      } else {
          // 正常模式
          req.session.fallback = false;
          res.send(data);
      }
    }); 
  }

  postAction () {
    // 对form表单提供的验证凭证进行验证
    captcha1.validate(req.session.fallback, {
      geetest_challenge: req.body.geetest_challenge,
      geetest_validate: req.body.geetest_validate,
      geetest_seccode: req.body.geetest_seccode
    }, function (err, success) {
      if (err) {
        // 网络错误
        res.send(err);
      } else if (!success) {
        // 二次验证失败
        res.send("<h1 style='text-align: center'>登录失败</h1>");
      } else {
        res.send("<h1 style='text-align: center'>登录成功</h1>");
      }

    });    
  }
};
