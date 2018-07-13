const defaultOptions = {
  user: 1,
  admin: 2
}

module.exports = (passOptions = {}) => {
  let options = object.assign({}, defaultOptions, passOptions);
  return (ctx, next) => {
    if (ctx.session('user')) {
      
    }


  }
}