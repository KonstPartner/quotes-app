export type Post = {
  id: string;
  title: string;
  body: string;
};

export type PostsResponse = {
  posts: {
    data: Post[];
    meta: {
      totalCount: number;
    };
  };
};

export type PostsVariables = {
  page: number;
  limit: number;
};
