import { ERROR, GET_POSTS, LOADING } from '@reduxTypes/postsTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
};

export default (state: object = INITIAL_STATE, action: any): object => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: '',
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
