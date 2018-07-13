module.exports = class extends think.Model {
  async getUserInfo (username) {
    return await this.where({'username': username}).find();
  }
};
