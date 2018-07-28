module.exports = class extends think.Model {
  beforeAdd (data) {
    return Object.assign({}, data, {createdat: new Date().toString()});
  }

  beforeUpdate (data) {
   return Object.assign({}, data, {lastmod: new Date().toString()});
  }

  async updateCompanyInfo (data, options) {
    return await this.where(options).update(data);
  }

  async addNewCompany (data) {
    return await this.add(data);
  }

};
