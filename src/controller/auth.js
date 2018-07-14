const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    let postData = this.ctx.post();
    let userModel = this.model('user');
    let userInfo = await userModel.getUserInfo(postData.username);
    if (userInfo && userInfo.password === postData.password) {
      this.ctx.session('user', userInfo);
      return this.success('Login successfully!');
    } else {
      return this.fail('Wrong username or password!');
    }
  }

  async registerAction () {
    try {
      let postData = this.ctx.post();
      let userModel = this.model('user');
      let finalData = Object.assign({}, {role: 'user', permission: 1, username: postData.username, password: postData.password, email: postData.email, employeeid: postData.employeeid, location: postData.location.join('|')});
      let result = await userModel.addNewUser(finalData);
      if (result) {
        return this.success('Register successfully!');
      } else {
        return this.fail('Register failed!');
      }      
    } catch (err) {
      return this.fail(err.message);
    }

  }
};
