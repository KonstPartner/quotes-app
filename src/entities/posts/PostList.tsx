import { RefObject } from 'react';

import { PostCard } from '@entities/posts';
import { Post } from '@features/posts/model';

const PostList = ({
  listRef,
  posts,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  posts: Post[];
}) => {
  return (
    <div
      ref={listRef}
      className="grid scroll-mt-60 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
