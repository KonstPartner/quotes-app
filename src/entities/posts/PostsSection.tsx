import { RefObject } from 'react';

import { PostList } from '@entities/posts';
import { Post } from '@features/posts/model';
import { PaginationBar } from '@features/shared/pagination/ui';

const PostsSection = ({
  listRef,
  posts,
  metadata,
  handleScroll,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  posts: Post[];
  metadata: { currentPage: number; totalPages: number };
  handleScroll: (page: number) => void;
}) => {
  return (
    <section className="container space-y-6">
      <PostList listRef={listRef} posts={posts} />
      <PaginationBar onPageChange={handleScroll} metadata={metadata} />
    </section>
  );
};

export default PostsSection;
