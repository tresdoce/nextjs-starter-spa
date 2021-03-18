/*import { Config } from '@tresdoce-toolkit/core';
import Configuration from '@config';
Config.addConfig(Configuration);
const { config } = Config.getAppConfig();*/

export const getCookie = (cookieName: string): string | null => {
  const nameEQ: string = `${cookieName}=`;
  const ca = window.document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
  /*let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;*/
};

export const setCookie = (
  cookieName: string,
  cookieValue: string,
  days?: number
) => {
  let cookieExpires = '';
  let cookieDomain = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    cookieExpires = `expires=${date.toUTCString()};`;
  }

  if (window.document.domain !== 'localhost') {
    cookieDomain = `domain=.${window.document.domain};`;
  }

  window.document.cookie = `${cookieName}=${
    cookieValue || ''
  }; ${cookieDomain} secure; path=/; ${cookieExpires}`;

  //window.document.cookie = "cookiename=test; secure; path=/; domain=.domain.com.ar;"
};
