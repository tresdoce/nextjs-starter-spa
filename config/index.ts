import { Typings } from '@tresdoce-toolkit/core';

const appBasepath = '';
const apiBasepath = `http://localhost:3000/bff`;
const cdnBasepath = 'https://static-pre.tresdoce.com.ar';
const staticUrl = './static';
const distributionChannel = 'local-mock';
const timeZone = 'America/Argentina/Buenos_Aires';

const baseDeployConfig: Typings.AppConfig = {
  config: {
    debug: false,
    distributionChannel,
    appBasepath,
    cdnBasepath,
    staticUrl,
    cookieDomain: '.tresdoce.com.ar',
    timeZone,
    api: {},
  },
};

const localConfig: { [key: string]: Typings.AppConfig } = {
  'local-bff': {
    config: {
      ...baseDeployConfig.config,
      debug: true,
      distributionChannel: 'local-bff',
      appBasepath: '',
      staticUrl: 'http://localhost:3000/static',
      api: {
        bff: {
          basepath: 'http://localhost:8080/api',
          withCredentials: false,
        },
      },
    },
  }, // local with bff local
  'local-mock': {
    config: {
      ...baseDeployConfig.config,
      debug: true,
      distributionChannel: 'local-mock',
      appBasepath: '',
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      staticUrl: 'http://localhost:3000/static',
      api: {
        bff: {
          basepath: apiBasepath,
          withCredentials: false,
        },
      },
    },
  }, // local with mock
  dev: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      debug: true,
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      staticUrl:
        'https://static-pre.tresdoce.com.ar/nextjs-starter-spa/dev/static',
      distributionChannel: 'dev',
      api: {
        bff: {
          basepath: apiBasepath,
          withCredentials: false,
        },
      },
    },
  }, // Desarrollo
  qas: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      staticUrl:
        'https://static-pre.tresdoce.com.ar/nextjs-starter-spa/qas/static',
      distributionChannel: 'qas',
      api: {
        bff: {
          basepath: apiBasepath,
          withCredentials: false,
        },
      },
    },
  }, // QA
  stg: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      staticUrl:
        'https://static-pre.tresdoce.com.ar/nextjs-starter-spa/stg/static',
      distributionChannel: 'stg',
      api: {
        bff: {
          basepath: apiBasepath,
          withCredentials: false,
        },
      },
    },
  }, // Staging
  canary: baseDeployConfig, // Canary en producción (friends & family, pruebas)
  latest: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      cdnBasepath: 'https://static.tresdoce.com.ar',
      staticUrl:
        'https://static.tresdoce.com.ar/nextjs-starter-spa/latest/static',
      distributionChannel: 'latest',
      api: {
        bff: {
          basepath: 'http://localhost:8080/api',
          withCredentials: false,
        },
      },
    },
  }, // Latest
  production: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      cdnBasepath: 'https://static.tresdoce.com.ar',
      staticUrl:
        'https://static.tresdoce.com.ar/nextjs-starter-spa/latest/static',
      distributionChannel: 'production',
      api: {
        bff: {
          basepath: 'http://localhost:8080/api',
          withCredentials: false,
        },
      },
    },
  }, // Latest en producción (la posta)
};

export default localConfig;
