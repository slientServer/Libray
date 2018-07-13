const Base = require('./base.js');

module.exports = class extends Base {
  loginAction() {
    let postData = this.ctx.post();
    let userModel = this.model('user');
    let userInfo = userModel.getUserInfo(postData.username);
    if (userInfo && userInfo.password === postData.password) {
      this.success('Login successfully!');
    } else {
      this.fail('Wrong username or password!');
    }
  }

  registerAction () {

  }
};
