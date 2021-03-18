import axios from 'axios';
import { HttpMethods } from './types';
//import { getCookie, setCookie } from '@utils';
import { Config } from '@tresdoce-toolkit/core';
import Configuration from '@config';

Config.addConfig(Configuration);
const { config } = Config.getAppConfig();

let headers = {
  'Content-Type': 'application/json',
  Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

const filterOptions = ({ method: string, ...rest }) => rest;

const fetch = async (url: string, options: any = {}) => {
  try {
    const instance = axios.create({
      baseURL: `${config.api.bff.basepath}`,
      validateStatus: (status) => {
        return status < 400 || status === 409;
      },
    });

    /*if (options['auth']) {
      const accessToken = getCookie(config['jwtCookie']);

      if (!accessToken) {
        //console.log(`Maybe ${config['jwtCookie']} cookie isn't set.`);
        //await refreshToken();
      } else {
        if (!options['headers']) {
          options['headers'] = {};
        }
        options['withCredentials'] = config.api.bff.withCredentials;
        options['headers']['Authorization'] = `Bearer ${accessToken}`;
      }
    }*/

    // INTERCEPTOR REQUEST
    /*instance.interceptors.request.use((conf) => {
      //console.log('1 Interceptor request conf: ', conf);
      return conf;
    });*/

    // INTERCEPTOR RESPONSE
    /*instance.interceptors.response.use(
      (response) => {
        //console.log('2 Interceptor response: ', response);
        // Error de negocio manejado => lo debe manejar el servicio o la pagina/componente que lo invoco (un action, un reducer, un modal, etc)
        return response.status === 409 ? Promise.reject(response) : response;
      },
      (error) => {
        //console.log('3 Interceptor response err.resp: ', error);
        return new Promise((resolve, reject) => {
          if (
            options['auth'] &&
            error.response &&
            (error.response.status === 401 ||
              error.response.status === 409 ||
              error.response.status === 403)
          ) {
            const serviceURL = error.config.url;

            const retryFetch = async () =>
              fetch(serviceURL, {
                auth: options['auth'],
                method: error.config.method,
              });

            return refreshToken()
              .then(() => {
                retryFetch()
                  .then((res) =>
                    resolve({ data: res, config: error.config, status: 200 })
                  )
                  .catch((err) => reject(err));
              })
              .catch((err) => reject(err));
          } else {
            //console.warn('Dont refresh token and go error page');
            // 5xx
            //return reject(error);
            navigate('/notification/general/error');
          }
        });
      }
    );*/

    /*instance.interceptors.response.use(
      (response) => {
        //console.log('Interceptor response: ', response);
        return response;
      },
      (error) => {
        //console.log('Interceptor response error: ', error);
        return Promise.reject(error);
      }
    );*/

    const { data } = await instance.request({
      url,
      data: options['data'],
      params: options['params'],
      method: options['method'],
      headers: options['headers'],
      withCredentials: options['withCredentials'],
      cancelToken: options['cancelFn']
        ? new axios.CancelToken(options['cancelFn'])
        : null,
    });

    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      throw new Error('request-cancelled');
    } else {
      throw err;
    }
  }
};

const get = async (url, options: any = {}) => {
  return await fetch(url, {
    method: HttpMethods.GET,
    withCredentials: config.api.bff.withCredentials,
    headers,
    ...filterOptions(options),
  });
};

const post = async (url, options: any = {}) => {
  return await fetch(url, {
    method: HttpMethods.POST,
    withCredentials: config.api.bff.withCredentials,
    headers,
    ...filterOptions(options),
  });
};

const put = async (url, options: any = {}) => {
  return await fetch(url, {
    method: HttpMethods.PUT,
    withCredentials: config.api.bff.withCredentials,
    headers,
    ...filterOptions(options),
  });
};

const del = async (url, options: any = {}) => {
  return await fetch(url, {
    method: HttpMethods.DELETE,
    withCredentials: config.api.bff.withCredentials,
    headers,
    ...filterOptions(options),
  });
};

export default {
  get,
  post,
  put,
  delete: del,
};
