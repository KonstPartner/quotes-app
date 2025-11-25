import { RefObject } from 'react';

import { PostList } from '@entities/posts';
import { PaginationBar } from '@features/pagination/ui';
import { Post } from '@features/posts/model';

type PostsSectionProps = {
  listRef: RefObject<HTMLDivElement | null>;
  posts: Post[];
  metadata: { currentPage: number; totalPages: number };
  handleScroll: (page: number) => void;
};

const PostsSection = ({
  listRef,
  posts,
  metadata,
  handleScroll,
}: PostsSectionProps) => {
  return (
    <section className="container space-y-6">
      <PostList listRef={listRef} posts={posts} />
      <PaginationBar onPageChange={handleScroll} metadata={metadata} />
    </section>
  );
};

export default PostsSection;
