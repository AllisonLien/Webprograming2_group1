import type { Post } from "../types";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  // Match the image shown on this post's card.
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  return (
    <article className="post-detail">
      <img
        src={imageUrl}
        alt={post.title}
        className="post-detail-image"
      />

      <h2>{post.title}</h2>

      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="post-tag">
            {tag}
          </span>
        ))}
      </div>

      <p className="post-stats">
        {post.views} views · {post.reactions.likes} likes ·{" "}
        {post.reactions.dislikes} dislikes
      </p>

      <div className="post-detail-content">
        <p>{post.body}</p>
      </div>
    </article>
  );
}