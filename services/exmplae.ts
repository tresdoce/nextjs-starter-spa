import { HttpClient } from '@tresdoce-toolkit/core';

const getExample: () => Promise<any> = async () => {
  const { data, errors } = await HttpClient.get(`/example-endpoint`, {
    api: 'bff',
    //requestInterceptors: [HttpClient.requestInterceptors],
    responseInterceptors: [HttpClient.NavigateOnErrorInterceptor('/notification/general/error')],
  });

  if (errors && errors.length) {
    throw new Error('Error get example.');
  }
  return data;
};

export default getExample;
