import { useState } from 'react';

import { PostsSection } from '@entities/posts';
import { ErrorSection, Loading } from '@entities/shared';
import { usePostsPage } from '@features/posts/api';
import { useScrollIntoView } from '@hooks';

const PostsContainer = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPages, loading, error, refetch } = usePostsPage(page);
  const { ref: listRef, handleScroll } = useScrollIntoView<[number]>(
    (nextPage) => setPage(nextPage)
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorSection callback={refetch} />;
  }

  return (
    <PostsSection
      posts={posts}
      listRef={listRef}
      handleScroll={handleScroll}
      metadata={{ currentPage: page, totalPages }}
    />
  );
};

export default PostsContainer;
