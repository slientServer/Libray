module.exports = class extends think.Model {
  async getUserInfo (username) {
    return await this.where({'username': username}).find();
  }

  async addNewUser (data) {
    return await this.add(data);
  }

  async updateUserInfo (data, options) {
    return await this.where(options).update(data);
  }
};
