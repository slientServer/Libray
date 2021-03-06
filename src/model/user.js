module.exports = class extends think.Model {
  beforeAdd (data) {
    return Object.assign({}, data, {createdat: new Date().toString()});
  }

  beforeUpdate (data) {
   return Object.assign({}, data, {lastmod: new Date().toString()});
  }

  async getUserInfo (username) {
    return await this.where({'username': username}).join({
      table: 'company',
      join: 'left',
      as: 'c',
      on: ['company', 'name']
    }).field('c.id as cid, c.name as cname, c.displayname as cdisplayname, user.*').find();
  }

  async addNewUser (data) {
    return await this.add(data);
  }

  async updateUserInfo (data, options) {
    return await this.where(options).update(data);
  }

};
