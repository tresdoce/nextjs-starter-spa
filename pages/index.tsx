import React from 'react';
import { Config, Typings } from '@tresdoce-toolkit/core';
import Configuration from '@config';
import { setCookie } from '@utils';
import setDistributionChannel from '@config/setDistributionChannel';

import AppRouter from '../commons/AppRouter';

// It's important to add the configuration object before any Config.getAppConfig call
Config.addConfig(Configuration);

interface IndexProps {
  config: Typings.Config;
  generalError?: any;
  session_id?: string;
}

class Index extends React.Component<IndexProps> {
  static displayName = 'Index';

  static async getInitialProps() {
    if (process.env.SESSION_ID) {
      const session_id = process.env.SESSION_ID;
      return { ...Config.getAppConfig(), session_id };
    }

    return Config.getAppConfig();
  }

  render() {
    setDistributionChannel();

    if (this.props.session_id) {
      setCookie('session_id', this.props.session_id);
    }

    return <AppRouter {...this.props} />;
  }
}
export default Index;
