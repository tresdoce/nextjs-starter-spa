import React from 'react';
import { connect } from 'react-redux';

// Components
import { Wrapper } from '@containers';

// Hooks
import { useApiOverview } from '@hooks/containers/services/useApiOverview';

// Types
import { OverviewProps } from './types';

const containerName = 'overview';

const Overview: React.FunctionComponent<OverviewProps> = ({ posts }) => {
  useApiOverview();

  return (
    <Wrapper id={containerName} active={false}>
      <h1>Hello world</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <br />
          </div>
        ))}
    </Wrapper>
  );
};

const mapStateToProps = ({ postsReducer }) => {
  return {
    posts: postsReducer.posts,
  };
};

export default connect(mapStateToProps, null)(Overview);
