import type { Post } from "../types";

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({ post, isSelected, onSelect }: Props) {
  // The API has no images, so we rotate through our 4 local images
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  return (
    <button
      type="button"
      className={`post-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(post)}
    >
      <img src={imageUrl} alt={post.title} className="post-card-image" />
      <span className="post-card-text">
        <strong>{post.title}</strong>
        <small>{post.tags.join(" · ")}</small>
        <span>{post.body.slice(0, 80)}...</span>
      </span>
    </button>
  );
}