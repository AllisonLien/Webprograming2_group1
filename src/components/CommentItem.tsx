import type { Comment } from "../types";

type Props = {
  comment: Comment;
};

// One comment: name, date (if we have one) and text
export default function CommentItem({ comment }: Props) {
  return (
    <article className="comment-item">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        {comment.date && <small>{comment.date}</small>}
      </div>
      <p className="comment-text">{comment.text}</p>
    </article>
  );
}
