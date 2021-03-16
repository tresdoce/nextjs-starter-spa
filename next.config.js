const path = require('path');
const spaBuildConfig = require('@galicia-toolkit/spa-build-config');

module.exports = (phase, { defaultConfig }) => {
  const spaConfig = spaBuildConfig.nextConfig(phase, { defaultConfig });
  const isProd = process.env.NODE_ENV === 'production';

  const webpackConfig = spaConfig.webpack;

  spaConfig.webpack = (config, options) => {
    const newConfig = webpackConfig(config, options);
    newConfig.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@lib': path.resolve(__dirname, 'lib/'),
        '@config': path.resolve(__dirname, 'config/'),
        '@contexts': path.resolve(__dirname, 'contexts/'),
        '@components': path.resolve(__dirname, 'components/'),
        '@containers': path.resolve(__dirname, 'containers/'),
        '@services': path.resolve(__dirname, 'services/'),
        '@utils': path.resolve(__dirname, 'utils/'),
        '@actions': path.resolve(__dirname, 'redux/actions/'),
        '@reducers': path.resolve(__dirname, 'redux/reducers/'),
        '@types': path.resolve(__dirname, 'redux/types/'),
        '@hooks': path.resolve(__dirname, 'hooks/'),
      },
    };

    return newConfig;
  };

  spaConfig.assetPrefix = isProd
    ? 'https://cdn.statically.io/gh/rudemex/test-nextjs-ghpage/gh-pages/'
    : '';

  return spaConfig;
};
