import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { Config, Typings } from '@tresdoce-toolkit/core';
import { createTheme } from '@tresdoce-ui/brand';
import { Layout } from '@tresdoce-ui/core';
import Head from 'next/head';
import idx from 'idx';
import Configuration from '../config';

interface AppProps {
  pageProps: Typings.AppConfig;
  cdnBasepath: string;
}

Config.addConfig(Configuration);

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
    this.setState({
      isServer: false,
    });
  }

  /*async componentDidMount() {
    Config.loadScript('/conf/env-config.js').then(() =>
      this.setState({
        ...Config.getAppConfig(),
        isServer: false,
      })
    );
  }*/

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    const theme = createTheme();
    const cdnBasepath = idx(pageProps.config, (_) => _.cdnBasepath) || '';
    const build_id = idx(pageProps.config, (_) => _.buildId) || 'development';
    const versionFile = build_id === 'development' ? Math.floor(Date.now() / 1000) : build_id;
    const staticUrl = idx(pageProps.config, (_) => _.staticUrl) || './static';

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
          <title>Starter SPA</title>
        </Head>
        <Container>
          <Layout theme={theme} cdnBasepath={`${cdnBasepath}/assets`}>
            <Component {...pageProps} /> {/* index.tsx */}
          </Layout>
        </Container>
      </Fragment>
    );
  }
}
