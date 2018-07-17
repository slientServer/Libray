const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {

  async getAction () {
    let userInfo = await this.ctx.session('user') || {};
    let dbUserInfo = await this.model('user').getUserInfo(userInfo.username);
    this.success(Object.assign({}, {
      username: dbUserInfo.username,
      employeeid: dbUserInfo.employeeid,
      gender: dbUserInfo.gender,
      location: dbUserInfo.location,
      phone: dbUserInfo.phone,
      nickname: dbUserInfo.nickname,
      wechat: dbUserInfo.wechat,
      email: dbUserInfo.email,
      team: dbUserInfo.team
    }));
  }

  async putAction () {
    let newUserInfo = this.post();
    let userId = (await this.ctx.session('user')).id;
    let userInfo = {};
    if (newUserInfo.password && newUserInfo.confirm && newUserInfo.password === newUserInfo.confirm) {
      userInfo = {
        password: newUserInfo.password
      };
    } else {
      userInfo = {
        gender: newUserInfo.gender,
        location: newUserInfo.location && newUserInfo.location.join('|'),
        phone: newUserInfo.phone,
        nickname: newUserInfo.nickname,
        wechat: newUserInfo.wechat,
        email: newUserInfo.email,
        team: newUserInfo.team
      };      
    }
    if (userId) {
      let affectRows = await this.model('user').updateUserInfo(userInfo, { 'id': userId });
      if (affectRows > 0){
        return this.success('Infomation update successfully!');
      } 
      return this.fail('Infomation update failed!');      
    }
    return this.fail('Infomation update failed!');
  }
};
