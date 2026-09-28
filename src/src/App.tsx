import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryList from "./components/CategoryList";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import { posts } from "./data/posts";
import type { Comment } from "./data/posts";
import "./App.css";

export default function App() {
  const [selectedPost, setSelectedPost] = useState(posts[0]);
  // Comments grouped by post id, plus the name of the last commenter
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [lastCommenter, setLastCommenter] = useState("");

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
        subtitle="Tutorials on React, TypeScript and modern web development"
      />

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
    </div>
  );
}