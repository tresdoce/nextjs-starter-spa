import React from 'react';
import { connect } from 'react-redux';

// Components
import { Wrapper } from '@containers';

// Hooks
import { useApiOverview } from '@hooks/containers/services/useApiOverview';

// Types
import { OverviewProps } from './types';
import { Post } from '@services/types';

const containerName = 'overview';

const Overview: React.FunctionComponent<OverviewProps> = ({ posts }) => {
  useApiOverview();

  const renderPost = (post) => {
    return (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <br />
      </div>
    );
  };

  return (
    <Wrapper id={containerName} active={false}>
      <h1>Hello world</h1>
      {posts && posts.map((post: Post) => renderPost(post))}
    </Wrapper>
  );
};

const mapStateToProps = ({ postsReducer }) => {
  return {
    posts: postsReducer.posts,
  };
};

export default connect(mapStateToProps, null)(Overview);
