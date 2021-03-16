import React from 'react';
import { Config, Typings } from '@galicia-toolkit/core';
import { setCookie } from '@utils';
import setDistributionChannel from '@config/setDistributionChannel';
import Configuration from '@config';
import AppRouter from '../commons/AppRouter';

interface IndexProps {
  user: Typings.User;
  config: Typings.Config;
  generalError?: any;
  session_id?: string;
}

// It's important to add the configuration object before any Config.getAppConfig call
Config.addConfig(Configuration);

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
