import type { Post } from "../data/posts";

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({ post, isSelected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`post-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(post)}
    >
      <img src={post.imageUrl} alt={post.title} className="post-card-image" />
      <span className="post-card-text">
        <strong>{post.title}</strong>
        <small>{post.date}</small>
        <span>{post.excerpt}</span>
      </span>
    </button>
  );
}