import type { Comment } from "../data/posts";
import CommentItem from "./CommentItem";
import "./comments.css";

type Props = {
  comments: Comment[];
};

// Shows all comments of the selected post
export default function CommentList({ comments }: Props) {
  return (
    <div className="comment-list">
      <h3 className="card-title">Comments ({comments.length})</h3>

      {comments.length === 0 ? (
        <p className="comment-empty">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((c) => <CommentItem key={c.id} comment={c} />)
      )}
    </div>
  );
}
