import type { Comment } from "../types";
import CommentItem from "./CommentItem";
import "./comments.css";

type Props = {
  comments: Comment[];
  loading: boolean;
};

// Shows all comments of the selected post: API comments plus any added here
export default function CommentList({ comments, loading }: Props) {
  return (
    <div className="comment-list">
      <h3 className="card-title">Comments ({comments.length})</h3>

      {loading && <p className="comment-empty">Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p className="comment-empty">No comments yet. Be the first to comment!</p>
      )}

      {!loading &&
        comments.map((c) => (
          <CommentItem key={`${c.source}-${c.id}`} comment={c} />
        ))}
    </div>
  );
}