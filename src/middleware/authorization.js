const defaultOptions = {
  permission: {
    common: 2,
    user: 2,
    admin: 3,
    super: 5
  }
}

module.exports = (passOptions = {}) => {
  let options = Object.assign({}, defaultOptions, passOptions);
  return async (ctx, next) => {
    let module = ctx.controller && ctx.controller.split('/')[0];
    let requiredPermission = options.permission[module] || 0;
    let userInfo = await ctx.session('user');
    if (requiredPermission === 0) {
      return next();
    }
    if (userInfo && userInfo.permission >= requiredPermission) {
      if (userInfo.status === 'active') {
        return next();
      } else {
        return ctx.fail(1001, 'Inactive user！');
      }
    } else {
      return ctx.fail(401, 'No permission!');
    }
  }
}