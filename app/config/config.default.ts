import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path'

const config = (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 配置文件上传
  // config.multipart = {
  //   fileSize: '50mb',
  //   mode: 'stream',
  // };

  // 配置静态文件夹
  config.static = {
    prefix: '/public/',
    dir: [path.join(appInfo.baseDir, 'app/public')]
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  //从框架/插件覆盖配置
  //用于 cookie 签名密钥，应更改为您自己的并保持安全 
  config.keys = appInfo.name + '_1631431183726_6553';

  //在这里添加你的egg配置 
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

export default config
