import { GET_POSTS, ERROR } from '@reduxTypes/postsTypes';
import { getPosts as getPostsSrv } from '@services';

// getState is optional to consume
export const getPosts = () => async (dispatch) => {
  try {
    const response = await getPostsSrv();

    dispatch({
      type: GET_POSTS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {
        error: error,
      },
    });
  }
};
