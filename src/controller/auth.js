const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    let postData = this.ctx.post();
    let userModel = this.model('user');
    let userInfo = await userModel.getUserInfo(postData.username);
    if (userInfo && userInfo.password === postData.password && userInfo.status === 'active') {
      this.ctx.session('user', userInfo);
      return this.success({
        userInfo: {
          username: userInfo.username,
          email: userInfo.email,
          employeeid: userInfo.employeeid,
          location: userInfo.location,
          role: userInfo.role
        },
        msg: 'Login successfully!'
      });
    } else {
      return this.fail('Wrong username or password!');
    }
  }

  async logoutAction() {
    try {
      await this.session(null);
      return this.success({
        msg: 'Logout successfully!'
      });
    } catch (err) {
      return this.fail('Logout failed!');
    }
  }

  async registerAction () {
    try {
      let postData = this.ctx.post();
      let userModel = this.model('user');
      let finalData = Object.assign({}, {role: 'user', permission: 1, username: postData.username, password: postData.password, email: postData.email, employeeid: postData.employeeid, location: postData.location.join('|')});
      let result = await userModel.addNewUser(finalData);
      if (result) {
        return this.success({
          userInfo: {
            username: postData.username,
            email: postData.email,
            employeeid: postData.employeeid, 
            location: postData.location,
            role: 'user'
          },
          msg:'Register successfully!'
        });
      } else {
        return this.fail('Register failed!');
      }      
    } catch (err) {
      return this.fail(err.message);
    }

  }
};
