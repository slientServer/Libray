const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction () {
    let pageSize = (this.get('pageSize') || 10) > 50 ? 50 :  (this.get('pageSize') || 10);
    let page = this.get('page') || 1;
    let sorter = this.get('sorter') || 'id DESC';
    let matchValue = this.get('matchValue') || '';
    let res = await this.model('user').page(page, pageSize).order(sorter).where({
      username: ['like', '%' + matchValue + '%'],
      employeeid: ['like', '%' + matchValue],
      email: ['like', '%' + matchValue+ '%'],
      _logic: 'OR'
    } ).fieldReverse('password').countSelect();
    if (think.isEmpty(res)) {
      this.success({});
    } else {
      this.success(res);
    }
  }

  async postAction () {
    let postData = this.post();
    let map = {'admin': 3, 'user': 2};
    let newData = Object.assign({}, postData, {'permission': (map[postData.role] || 2)});
    let res = await this.model('user').addNewUser(newData);
    if (res) {
      return this.success(newData, 'Register successfully!');
    } else {
      return this.fail('Register failed!');
    }     
  }

  async putAction () {
    let postData = this.post();
    let newData = {};
    newData[postData.key] = postData.value;
    if (postData.key = 'role') {
      let map = {'admin': 3, 'user': 2};
      newData['permission'] = map[postData.value] || 2;
    }
    let affectRows = await this.model('user').updateUserInfo(newData, {id: postData.id});
    if (affectRows) {
      return this.success({}, 'Data update successfully!');
    } 
    return this.fail('Data udpate failed!');
  }

  async deleteAction () {
    let affectedRows= await this.model('user').where({'id': this.get('id')}).delete();
    if (affectedRows > 0) {
      return this.success({}, 'Delete item successfully!');
    }
    return this.fail('Delete item failed!');
  }

};
