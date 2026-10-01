import type { Post } from "../types";

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({
  post,
  isSelected,
  onSelect,
}: Props) {
  // Rotate through our four local images.
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  // Use the first 100 characters as the card preview.
  const excerpt =
    post.body.length > 100
      ? post.body.slice(0, 100) + "..."
      : post.body;

  return (
    <button
      type="button"
      className={`post-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(post)}
    >
      <img
        src={imageUrl}
        alt={post.title}
        className="post-card-image"
      />

      <span className="post-card-text">
        <strong>{post.title}</strong>

        <span className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="post-tag">
              {tag}
            </span>
          ))}
        </span>

        <span>{excerpt}</span>

        <small className="post-stats">
          {post.views} views · {post.reactions.likes} likes
        </small>
      </span>
    </button>
  );
}