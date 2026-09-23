import type { Post } from "../data/posts";

type Props = {
  posts: Post[];
};

export default function CategoryList({ posts }: Props) {
  // Collect each category name once (no duplicates)
  const categories: string[] = [];
  posts.forEach((p) => {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  return (
    <div className="card category-card">
      <h3 className="card-title">Categories</h3>

      <ul className="category-list">
        {categories.map((c) => (
          <li key={c} className="category-item">
            <span>{c}</span>
            <span className="category-count">
              ({posts.filter((p) => p.category === c).length})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}