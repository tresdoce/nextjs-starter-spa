import httpClient from '@lib/http-client';
import { Posts } from '@services/types';

const getPosts = async (): Promise<Posts[]> => {
  try {
    return await httpClient.get('/posts');
  } catch (err) {
    throw new Error('Error get posts.');
  }
};

export default getPosts;
