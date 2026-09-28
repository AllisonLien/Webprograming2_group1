import type { Post } from "../data/posts";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <article className="post-detail">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="post-detail-image"
      />

      <h2>{post.title}</h2>
      <p className="post-detail-meta">
        {post.date}
        <span className="post-tag">{post.category}</span>
      </p>

      <div className="post-detail-content">
        {post.content
          .trim()
          .split("\n")
          .filter((line) => line.trim())
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </div>
    </article>
  );
}