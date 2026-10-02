import type { Post } from "../types";

type Props = {
  posts: Post[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
};

export default function CategoryList({ posts, selectedTag, onSelectTag }: Props) {
  // Collect every tag once (no duplicates)
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
        {/* "All" shows every post again */}
        <li>
          <button
            type="button"
            className={`category-item ${selectedTag === "All" ? "active" : ""}`}
            onClick={() => onSelectTag("All")}
          >
            <span>All</span>
            <span className="category-count">({posts.length})</span>
          </button>
        </li>

        {tags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              className={`category-item ${selectedTag === tag ? "active" : ""}`}
              onClick={() => onSelectTag(tag)}
            >
              <span>{tag}</span>
              <span className="category-count">
                ({posts.filter((p) => p.tags.includes(tag)).length})
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}