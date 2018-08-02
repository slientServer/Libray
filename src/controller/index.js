const Base = require('./base.js');
const send = require('koa-send');

module.exports = class extends Base {
  async indexAction() {
    let res = await send(this.ctx, 'www/static/build/index.html');
    return res;
  }
};
