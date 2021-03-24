import React from 'react';
import { connect } from 'react-redux';

// Components
import { Wrapper } from '@containers';
import { ItemListPost } from '@components';

// Hooks
import { useApiOverview } from '@hooks/containers/services/useApiOverview';

// Types
import { OverviewProps } from './types';
import { Post } from '@services/types';

const containerName = 'overview';

const renderItemsList = (posts) => {
  return posts.map((item) => <li>{item.id}</li>);
};

const Overview: React.FunctionComponent<OverviewProps> = ({ posts }) => {
  useApiOverview();

  return (
    <Wrapper id={containerName} active={false}>
      <h1>Hello world</h1>
      {posts && posts.map((post: Post) => <ItemListPost post={post} />)}
      <hr />
      {posts && <ul>{renderItemsList(posts)}</ul>}
    </Wrapper>
  );
};

const mapStateToProps = ({ postsReducer }) => {
  return {
    posts: postsReducer.posts,
  };
};

export default connect(mapStateToProps, null)(Overview);
