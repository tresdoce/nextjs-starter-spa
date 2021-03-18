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
      cdnBasepath: 'https://static-pre.bancogalicia.com.ar',
      staticUrl:
        'https://static-pre.bancogalicia.com.ar/spa-experiencia/dev/static',
      debug: true,
      api: {
        bff: {
          basepath:
            'https://bff-experiencia-ofbr-infolending-dev.devcloud.bancogalicia.com.ar/bff',
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
        'https://static-pre.bancogalicia.com.ar/spa-experiencia/qas/static',
      cdnBasepath: 'https://static-pre.bancogalicia.com.ar',
      api: {
        bff: {
          basepath:
            'https://bff-experiencia-ofbr-infolending-qas.stgcloud.bancogalicia.com.ar/bff',
          withCredentials: false,
        },
      },
    },
  }, // QA
  stg: {
    ...baseDeployConfig,
    config: {
      ...baseDeployConfig.config,
      cdnBasepath: 'https://static-pre.bancogalicia.com.ar',
      staticUrl:
        'https://static-pre.bancogalicia.com.ar/spa-experiencia/stg/static',
      api: {
        bff: {
          basepath:
            'https://bff-experiencia-ofbr-infolending-int.stgcloud.bancogalicia.com.ar/bff',
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
      cdnBasepath: 'https://static.bancogalicia.com.ar',
      staticUrl:
        'https://static.bancogalicia.com.ar/spa-experiencia/latest/static',
      api: {
        bff: {
          basepath: 'https://ofbr.bff.bancogalicia.com.ar/bff',
          withCredentials: false,
        },
      },
    },
  }, // Latest en producción (la posta)
};

export default localConfig;
