module.exports = class extends think.Logic {
  async putAction () {
    let editableFields = ['displayname', 'status'];
    let postData = this.post();
    if (postData && postData.id !== undefined) {
      if (editableFields.indexOf(postData.key) === -1) {
        return this.fail('Field update failed!');
      }
    } else {
      return this.fail('Field update failed!');
    }
  }

  async postAction () {
    let rules = {
      name: {
          string: true,       // 字段类型为 String 类型
          required: true,     // 字段必填
          method: 'post',       // 指定获取数据的方式
          trim: true
      },
      displayname: {
          string: true,       // 字段类型为 String 类型
          required: true,     // 字段必填
          method: 'post',       // 指定获取数据的方式
          trim: true        
      },
      status: {
          string: true,
          required: true,     // 字段必填
          method: 'post'       // 指定获取数据的方式
      }
    }
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('Please input all required fields!', this.validateErrors);
    }    
  }
};
