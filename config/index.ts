import { Typings } from '@tresdoce-toolkit/core';

const appBasepath = '';
const distributionChannel = 'local-mock';
const apiBasepath = `http://localhost:3000/bff`;
const cdnBasepath = 'https://cdn.statically.io';
const staticUrl = './static';
const timeZone = 'America/Argentina/Buenos_Aires';

const baseDeployConfig: Typings.AppConfig = {
  config: {
    debug: false,
    cookieDomain: '.tresdoce.com.ar',
    appBasepath,
    cdnBasepath,
    staticUrl,
    timeZone,
    distributionChannel,
    api: {},
  },
};

const localConfig: { [key: string]: Typings.AppConfig } = {
  'local-bff': {
    config: {
      ...baseDeployConfig.config,
      appBasepath: '',
      staticUrl: 'http://localhost:3000/static',
      debug: true,
      distributionChannel: 'local-bff',
      api: {
        bff: {
          basepath: 'http://localhost:8080/bff',
          withCredentials: false,
        },
      },
    },
  }, // local with bff local
  'local-mock': {
    config: {
      ...baseDeployConfig.config,
      appBasepath: '',
      staticUrl: 'http://localhost:3000/static',
      distributionChannel: 'local-mock',
      debug: true,
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
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      staticUrl:
        'https://static-pre.tresdoce.com.ar/nextjs-starter-spa/dev/static',
      debug: true,
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
      staticUrl:
        'https://static-pre.tresdoce.com.ar/nextjs-starter-spa/qas/static',
      cdnBasepath: 'https://static-pre.tresdoce.com.ar',
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
      api: {
        bff: {
          basepath: apiBasepath,
          withCredentials: false,
        },
      },
    },
  }, // Latest en producción (la posta)
};

export default localConfig;
