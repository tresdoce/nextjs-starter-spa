import React from 'react';
import { Link as ReachLink, navigate as reachNavigate } from '@reach/router';
import { Config } from '@galicia-toolkit/core';
import Configuration from '@config';

Config.addConfig(Configuration);
const { config } = Config.getAppConfig();

const getBasepath = () =>
  config.appBasepath && config.appBasepath[0] !== '/'
    ? `/${config.appBasepath}`
    : config.appBasepath;

export const normalizeUrl = (url: string): string => {
  return url
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-');
};

export const Link = ({
  to = '',
  children,
  absolute,
  normalize = true,
  ...props
}): any => {
  if (!absolute && to[0] === '/') {
    to = `${getBasepath()}${to}`;
  }

  return (
    <ReachLink {...props} to={normalize ? normalizeUrl(to) : to}>
      {children}
    </ReachLink>
  );
};

export const navigate = (to, options?, normalize = true, absolute = false) => {
  if (!absolute && to[0] === '/') {
    to = `${getBasepath()}${to}`;
  }
  reachNavigate(normalize ? normalizeUrl(to) : to, options);
};

export const goBack = (to: any = -1) => {
  reachNavigate(to);
};
