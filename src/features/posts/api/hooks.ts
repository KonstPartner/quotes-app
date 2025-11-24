import { useQuery } from '@apollo/client/react';

import { GET_POSTS, POSTS_LIMIT } from '@features/posts/api';
import type {
  Post,
  PostsResponse,
  PostsVariables,
} from '@features/posts/model';

export const usePostsPage = (page: number) => {
  const { data, loading, error, refetch } = useQuery<
    PostsResponse,
    PostsVariables
  >(GET_POSTS, {
    variables: {
      page,
      limit: POSTS_LIMIT,
    },
    notifyOnNetworkStatusChange: true,
  });

  const posts: Post[] = data?.posts.data ?? [];
  const totalCount = data?.posts.meta.totalCount ?? 0;
  const totalPages = totalCount ? Math.ceil(totalCount / POSTS_LIMIT) : 1;

  return {
    posts,
    totalCount,
    totalPages,
    loading,
    error,
    refetch,
  };
};
