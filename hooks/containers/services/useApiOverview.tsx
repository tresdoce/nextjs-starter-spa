import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getPosts } from '@actions/postsActions';

export const useApiOverview = async () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getApis = async () => {
      try {
        dispatch(getPosts());
      } catch (error) {}
    };

    getApis();
  }, [dispatch]);
};
