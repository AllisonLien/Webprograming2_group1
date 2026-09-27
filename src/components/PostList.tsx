import type { Post } from "../data/posts";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
  selectedPost: Post;
  onSelect: (post: Post) => void;
};

export default function PostList({ posts, selectedPost, onSelect }: Props) {
  return (
    <section>
      <h2>Recent Posts</h2>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isSelected={post.id === selectedPost.id}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}