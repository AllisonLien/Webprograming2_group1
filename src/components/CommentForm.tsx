import { useState } from "react";
import type { FormEvent } from "react";
import type { Comment } from "../data/posts";
import "./comments.css";

type Props = {
  postId: number;
  lastCommenter: string;
  onAdd: (comment: Comment) => void;
};

type Errors = { name?: string; text?: string };

export default function CommentForm({ postId, lastCommenter, onAdd }: Props) {
  // Name starts as the last commenter so people do not retype it
  const [name, setName] = useState(lastCommenter);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validation: spaces do not count, so trim first
    const newErrors: Errors = {};
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (text.trim().length < 5) {
      newErrors.text = "Comment must be at least 5 characters.";
    }
    setErrors(newErrors);
    if (newErrors.name || newErrors.text) return;

    // Send the new comment up to App
    onAdd({
      id: Date.now(),
      postId,
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString("en-CA"),
    });
    setText("");
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3 className="card-title">Leave a comment</h3>

      <label htmlFor="comment-name">Name</label>
      <input
        id="comment-name"
        className="comment-input"
        value={name}
        maxLength={30}
        aria-invalid={!!errors.name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="comment-error">{errors.name}</p>}

      <label htmlFor="comment-text">Comment</label>
      <textarea
        id="comment-text"
        className="comment-input"
        value={text}
        maxLength={300}
        aria-invalid={!!errors.text}
        onChange={(e) => setText(e.target.value)}
      />
      {errors.text && <p className="comment-error">{errors.text}</p>}

      <button type="submit" className="comment-button">
        Post comment
      </button>
    </form>
  );
}
