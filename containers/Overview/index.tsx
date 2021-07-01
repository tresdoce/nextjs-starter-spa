import React from 'react';
import { connect } from 'react-redux';

// Components
import { Wrapper } from '@containers';
import { ItemListPost } from '@components';
import { Button } from '@tresdoce-ui/core';

// Hooks
import { useApiOverview } from '@hooks/containers/services/useApiOverview';

// Types
import { OverviewProps } from './types';
import { Post } from '@services/types';

const containerName = 'overview';

const Overview: React.FC<OverviewProps> = ({ posts }) => {
  useApiOverview();

  return (
    <Wrapper id={containerName} active={false}>
      <h1>Hello world</h1>
      <Button foo={'test button'} onClick={() => console.warn('click')} />

      {posts &&
        posts.length &&
        posts.map((post: Post, index: number) => <ItemListPost key={index} post={post} />)}
    </Wrapper>
  );
};

const mapStateToProps = ({ postsReducer }) => {
  return {
    posts: postsReducer.posts,
  };
};

export default connect(mapStateToProps, null)(Overview);
