import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryList from "./components/CategoryList";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import type { Post, PostsResponse } from "./types";
import type { Comment } from "./data/posts";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [lastCommenter, setLastCommenter] = useState("");

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
            <PostList
              posts={posts}
              selectedPost={selectedPost}
              onSelect={setSelectedPost}
            />
          </section>

          <section className="column-main">
            <PostDetail post={selectedPost} />

            <section className="card comments-card">
              <CommentList comments={comments[selectedPost.id] ?? []} />
              <CommentForm
                key={selectedPost.id}
                postId={selectedPost.id}
                lastCommenter={lastCommenter}
                onAdd={addComment}
              />
            </section>
          </section>

          <aside className="column-sidebar">
            <CategoryList posts={posts} />
          </aside>
        </main>
      )}
    </div>
  );
}