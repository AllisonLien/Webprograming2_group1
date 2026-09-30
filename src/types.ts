
export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};