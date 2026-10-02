import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryList from "./components/CategoryList";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import type { Post, PostsResponse, Comment, CommentsResponse } from "./types";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Part C: locally added comments, grouped by post id
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [lastCommenter, setLastCommenter] = useState("");

  // Part C: comments fetched from the API, grouped by post id.
  // A post id missing from this object means it hasn't loaded yet.
  const [apiComments, setApiComments] = useState<Record<number, Comment[]>>({});
  const commentsLoading = selectedPost ? !(selectedPost.id in apiComments) : false;

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data: PostsResponse) => {
        setPosts(data.posts);
        setSelectedPost(data.posts[0] ?? null);
      })
      .catch(() => {
        setError("Unable to load blog posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Part C: fetch comments for whichever post is selected
  useEffect(() => {
    if (!selectedPost) return;

    fetch(`https://dummyjson.com/posts/${selectedPost.id}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data: CommentsResponse) => {
        const mapped: Comment[] = data.comments.map((c) => ({
          id: c.id,
          postId: c.postId,
          name: c.user.fullName,
          text: c.body,
          source: "api",
        }));
        setApiComments((prev) => ({ ...prev, [selectedPost.id]: mapped }));
      })
      .catch(() => {
        // Keep showing locally added comments even if the API fails
        setApiComments((prev) => ({ ...prev, [selectedPost.id]: [] }));
      });
  }, [selectedPost]);
  // Part A: only keep posts that have the selected tag
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((p) => p.tags.includes(selectedTag));

  function handleSelectTag(tag: string) {
    setSelectedTag(tag);

    // select the first post of the new list so the detail always matches the list on the left
    const list = tag === "All" ? posts : posts.filter((p) => p.tags.includes(tag));
    if (list.length > 0) {
      setSelectedPost(list[0]);
    }
  }
  function addComment(comment: Comment) {
    setComments((prev) => ({
      ...prev,
      [comment.postId]: [...(prev[comment.postId] ?? []), comment],
    }));
    setLastCommenter(comment.name);
  }

  return (
    <div>
      <Navbar siteName="Group1" />

      <Hero
        title="Welcome to Group1"
        subtitle="Stories and ideas from our community"
      />

      {loading && (
        <div className="container status-area">
          <div className="card status-card">
            <p className="status-text">Loading posts...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="container status-area">
          <div className="card status-card">
            <h3 className="status-title">Unable to load blog posts.</h3>
            <p className="status-text">Please try again later.</p>
          </div>
        </div>
      )}

      {!loading && !error && selectedPost && (
        <main className="container main-layout">
                   <section className="column-left">
            {selectedTag !== "All" && (
              <p className="filter-info">
                Showing posts tagged <strong>{selectedTag}</strong> ({filteredPosts.length})
                <button
                  type="button"
                  className="filter-clear"
                  onClick={() => handleSelectTag("All")}
                >
                  Clear
                </button>
              </p>
            )}

            <PostList
              posts={filteredPosts}
              selectedPost={selectedPost}
              onSelect={setSelectedPost}
            />
          </section>

          <section className="column-main">
            <PostDetail post={selectedPost} />

            <section className="card comments-card">
              <CommentList
                comments={[
                  ...(apiComments[selectedPost.id] ?? []),
                  ...(comments[selectedPost.id] ?? []),
                ]}
                loading={commentsLoading}
              />
              <CommentForm
                key={selectedPost.id}
                postId={selectedPost.id}
                lastCommenter={lastCommenter}
                onAdd={addComment}
              />
            </section>
          </section>

          <aside className="column-sidebar">
              <CategoryList
              posts={posts}
              selectedTag={selectedTag}
              onSelectTag={handleSelectTag}
            />
          </aside>
        </main>
      )}
    </div>
  );
}