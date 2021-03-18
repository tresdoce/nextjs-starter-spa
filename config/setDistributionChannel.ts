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
};

export default setDistributionChannel;
