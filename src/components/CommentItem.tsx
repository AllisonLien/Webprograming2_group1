import type { Comment } from "../data/posts";

type Props = {
  comment: Comment;
};

// One comment: name, date and text
export default function CommentItem({ comment }: Props) {
  return (
    <article className="comment-item">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <small>{comment.date}</small>
      </div>
      <p className="comment-text">{comment.text}</p>
    </article>
  );
}
