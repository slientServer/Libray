const defaultOptions = {
  permission: {
    common: 2,
    user: 2,
    admin: 3
  }
}

module.exports = (passOptions = {}) => {
  let options = Object.assign({}, defaultOptions, passOptions);
  return async (ctx, next) => {
    let module = ctx.controller && ctx.controller.split('/')[0];
    let requiredPermission = options.permission[module] || 0;
    let userInfo = await ctx.session('user');
    if ((userInfo && userInfo.permission >= requiredPermission && userInfo.status === 'active') || (requiredPermission === 0)) {
      return next();
    } else {
      return ctx.fail(1000, 'No permission or inactive!');
    }
  }
}