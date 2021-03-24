import React from 'react';

import { ItemListPostsProps } from './types';

const ItemListPost: React.FC<ItemListPostsProps> = ({ post }) => {
  return (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <br />
    </div>
  );
};

export default ItemListPost;
