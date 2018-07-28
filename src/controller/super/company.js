const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction () {
    let pageSize = (this.get('pageSize') || 10) > 50 ? 50 :  (this.get('pageSize') || 10);
    let page = this.get('page') || 1;
    let sorter = this.get('sorter') || 'id DESC';
    let matchValue = this.get('matchValue') || '';
    let res = await this.model('company').page(page, pageSize).order(sorter).where({
      name: ['like', '%' + matchValue + '%'],
      displayname: ['like', '%' + matchValue],
      _logic: 'OR'
    } ).countSelect();
    if (think.isEmpty(res)) {
      this.success({});
    } else {
      this.success(res);
    }
  }

  async postAction () {
    let postData = this.post();
    let res = await this.model('company').addNewCompany(postData);
    if (res) {
      return this.success(Object.assign({}, postData, {id: res}), 'Add successfully!');
    } else {
      return this.fail('Add failed!');
    }     
  }

  async putAction () {
    let postData = this.post();
    let newData = {};
    newData[postData.key] = postData.value;
    let affectRows = await this.model('company').updateCompanyInfo(newData, {id: postData.id});
    if (affectRows) {
      return this.success({}, 'Data update successfully!');
    } 
    return this.fail('Data udpate failed!');
  }

  async deleteAction () {
    let affectedRows= await this.model('company').where({'id': this.get('id')}).delete();
    if (affectedRows > 0) {
      return this.success({}, 'Delete item successfully!');
    }
    return this.fail('Delete item failed!');
  }

};
