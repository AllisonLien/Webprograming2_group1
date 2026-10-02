import { useForm } from "react-hook-form";
import type { Comment } from "../types";
import "./comments.css";

// Module-level counter so ids stay unique even if the form remounts
// when switching between posts
let nextLocalId = 1;

type Props = {
  postId: number;
  lastCommenter: string;
  onAdd: (comment: Comment) => void;
};

// What the form collects
type FormValues = {
  name: string;
  email: string;
  text: string;
};

// A simple email pattern, good enough for form validation
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CommentForm({ postId, lastCommenter, onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: lastCommenter, email: "", text: "" },
  });

  function onSubmit(values: FormValues) {
    onAdd({
      id: nextLocalId++,
      postId,
      name: values.name.trim(),
      email: values.email.trim(),
      text: values.text.trim(),
      date: new Date().toLocaleDateString("en-CA"),
      source: "local",
    });

    // Keep the name, clear email and comment
    reset({ name: values.name.trim(), email: "", text: "" });
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 className="card-title">Add a Comment</h3>

      <label htmlFor="comment-name">Name</label>
      <input
        id="comment-name"
        className="comment-input"
        aria-invalid={!!errors.name}
        {...register("name", {
          required: "Name is required.",
          minLength: { value: 2, message: "Name must contain at least 2 characters." },
          maxLength: 30,
        })}
      />
      {errors.name && <p className="comment-error">{errors.name.message}</p>}

      <label htmlFor="comment-email">Email</label>
      <input
        id="comment-email"
        className="comment-input"
        aria-invalid={!!errors.email}
        {...register("email", {
          required: "Email is required.",
          pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
        })}
      />
      {errors.email && <p className="comment-error">{errors.email.message}</p>}

      <label htmlFor="comment-text">Comment</label>
      <textarea
        id="comment-text"
        className="comment-input"
        aria-invalid={!!errors.text}
        {...register("text", {
          required: "Comment is required.",
          minLength: { value: 10, message: "Comment must be at least 10 characters." },
          maxLength: { value: 500, message: "Comment must be 500 characters or fewer." },
        })}
      />
      {errors.text && <p className="comment-error">{errors.text.message}</p>}

      <button type="submit" className="comment-button">
        Post Comment
      </button>
    </form>
  );
}
