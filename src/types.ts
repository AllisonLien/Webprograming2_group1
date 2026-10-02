
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

// Part C: a comment shown under a post.
// "api" comments come from dummyjson, "local" ones are added in the form.
export type Comment = {
  id: number;
  postId: number;
  name: string;
  email?: string;
  text: string;
  date?: string;
  source: "api" | "local";
};

export type ApiComment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: { id: number; username: string; fullName: string };
};

export type CommentsResponse = {
  comments: ApiComment[];
  total: number;
  skip: number;
  limit: number;
};