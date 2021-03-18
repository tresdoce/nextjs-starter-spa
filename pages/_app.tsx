import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { Typings } from '@tresdoce-toolkit/core';
import Head from 'next/head';
import idx from 'idx';

import { Config } from '@tresdoce-toolkit/core';
import Configuration from '@config';

Config.addConfig(Configuration);
const { config } = Config.getAppConfig();

interface AppProps {
  pageProps: Typings.AppConfig;
  cdnBasepath: string;
}

export default class MyApp extends App<AppProps> {
  static displayName = 'MyApp';

  static async getInitialProps({ Component, ctx }) {
    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        ...pageProps,
        isServer: 'req' in ctx,
      },
    };
  }

  state = {
    isServer: this.props.pageProps.isServer,
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidMount() {
    this.setState({ isServer: false });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    const build_id = idx(pageProps.config, (_) => _.buildId) || 'development';
    const versionFile =
      build_id === 'development' ? Math.floor(Date.now() / 1000) : build_id;
    const staticUrl = idx(config, (_) => _.staticUrl) || './static';

    // Next renders error pages on export so we should catch this options
    if (pageProps.statusCode) {
      return <p>error {pageProps.statusCode}</p>;
    }

    // Don't render Server Side Rendering
    if (this.state.isServer) {
      return null;
    }

    return (
      <Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <link
            href={`${staticUrl}/assets/css/app.min.css?v=${versionFile}`}
            type="text/css"
            rel="stylesheet"
          />
          <title>Office Banking</title>
        </Head>
        <Container>
          <Component {...pageProps} /> {/* index.tsx */}
        </Container>
      </Fragment>
    );
  }
}
