import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import {
  Typings,
  UIContext,
  Functionality,
  UIContextComponents,
  ErrorBoundary,
} from '@galicia-toolkit/core';
import { themes } from '@brick/brand';
import { Layout } from '@brick/core';
import Head from 'next/head';
import idx from 'idx';
import { MODULE_ID } from '../config/constants';
import { AppContainer } from '@galicia-ui/web-platform';

import { Config } from '@galicia-toolkit/core';
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
    const cdnBasepath = idx(pageProps.config, (_) => _.cdnBasepath) || '';
    const themeName = idx(pageProps.user, (_) => _.theme);
    const functionalities = idx(pageProps.user, (_) => _.functionalities) || [];
    const theme = themes[themeName] || themes.classic;
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
          <Layout theme={theme} cdnBasepath={`${cdnBasepath}/assets-brick`}>
            {' '}
            {/* Gives @galicia-ui required context and theme for its components */}
            <ErrorBoundary.ErrorBoundary>
              {' '}
              {/* Provides a Boundary for errors on the application*/}
              <UIContext.Provider>
                {' '}
                {/* Provides a context for the modals & sidedrawers from @galicia-toolkit */}
                <Functionality.Provider
                  idModule={MODULE_ID.PARENT}
                  rootFunctionality={functionalities}
                >
                  {' '}
                  {/* Provides Functionality tree context  */}
                  <AppContainer variant="ofb">
                    {' '}
                    {/* Adapts layout for OnlineBanking */}
                    <Component {...pageProps} /> {/* index.tsx */}
                  </AppContainer>
                  <UIContextComponents.SideDrawer />{' '}
                  {/* Implementation of the @galicia-ui sideDrawer for @galicia-toolkit hooks */}
                  <UIContextComponents.Modal />{' '}
                  {/* Implementation of the @galicia-ui modal for @galicia-toolkit hooks */}
                </Functionality.Provider>
              </UIContext.Provider>
            </ErrorBoundary.ErrorBoundary>
          </Layout>
        </Container>
      </Fragment>
    );
  }
}
