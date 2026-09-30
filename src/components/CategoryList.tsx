import type { Post } from "../types";

type Props = {
  posts: Post[];
};

export default function CategoryList({ posts }: Props) {
  const tags: string[] = [];
  posts.forEach((p) => {
    p.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  return (
    <div className="card category-card">
      <h3 className="card-title">Tags</h3>

      <ul className="category-list">
        {tags.map((tag) => (
          <li key={tag} className="category-item">
            <span>{tag}</span>
            <span className="category-count">
              ({posts.filter((p) => p.tags.includes(tag)).length})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}