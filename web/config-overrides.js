const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const theme = require('./src/theme/index'); 

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: theme.greenTheme
  })(config, env);
  return config;
};