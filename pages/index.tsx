import React from 'react';
import { Config, Typings } from '@tresdoce-toolkit/core';
import setDistributionChannel from '@config/setDistributionChannel';
import Configuration from '@config';
import AppRouter from '../commons/AppRouter';

interface IndexProps {
  config: Typings.Config;
  generalError?: any;
}

// It's important to add the configuration object before any Config.getAppConfig call
Config.addConfig(Configuration);

class Index extends React.Component<IndexProps> {
  static displayName = 'Index';

  static async getInitialProps() {
    return Config.getAppConfig();
  }

  render() {
    setDistributionChannel();
    return <AppRouter {...this.props} />;
  }
}
export default Index;
