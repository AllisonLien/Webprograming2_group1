import type { Post } from "../types";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  return (
    <article className="post-detail">
      <img src={imageUrl} alt={post.title} className="post-detail-image" />

      <h2>{post.title}</h2>
      <p className="post-detail-meta">
        {post.tags.map((tag) => (
          <span key={tag} className="post-tag">
            {tag}
          </span>
        ))}
      </p>

      <div className="post-detail-content">
        <p>{post.body}</p>
      </div>
    </article>
  );
}