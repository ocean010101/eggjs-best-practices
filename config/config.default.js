/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586555566673_8463';

  // add your middleware config here
  config.middleware = ['errorHandler'];
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'eggjs-best-practices 项目接口',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],// 发出文档使用的协议
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,//自动生成API路由
    enable: true,
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/egg_server',
      options: {
        autoReconnect: true, // 自动连接
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
