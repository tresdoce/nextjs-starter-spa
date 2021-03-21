import idx from 'idx';

const setDistributionChannel = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const buildId = idx(window, (_) => _.__NEXT_DATA__.buildId);

  window.__NEXT_DATA__.props.pageProps.config = {
    ...window.__NEXT_DATA__.props.pageProps.config,
    buildId,
  };

  /*const env = idx(window, (_) => _.__NEXT_DATA__.props.pageProps.config.environment);
  const config = idx(window, (_) => _.__NEXT_DATA__.props.pageProps.config);
  switch (env) {
    case 'Desarrollo':
      window.__NEXT_DATA__.props.pageProps.config.distributionChannel = 'dev';
      break;
    case 'Homologacion':
      window.__NEXT_DATA__.props.pageProps.config.distributionChannel = 'qas';
      break;
    case 'Produccion':
      window.__NEXT_DATA__.props.pageProps.config.distributionChannel =
        'latest';
      break;
    case 'local-bff':
      window.__NEXT_DATA__.props.pageProps.config = {
        ...config,
        distributionChannel: 'local-bff',
        cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      };
      break;
    default:
      window.__NEXT_DATA__.props.pageProps.config = {
        ...config,
        distributionChannel: 'local-mock',
        cdnBasepath: 'https://static-pre.tresdoce.com.ar',
      };
  }*/
};

export default setDistributionChannel;
