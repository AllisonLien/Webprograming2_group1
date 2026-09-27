import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryList from "./components/CategoryList";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import { posts } from "./data/posts";
import "./App.css";

export default function App() {
  const [selectedPost, setSelectedPost] = useState(posts[0]);

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

          <div className="placeholder">
            CommentList + CommentForm (Part C)
          </div>
        </section>

        <aside className="column-sidebar">
          <CategoryList posts={posts} />
        </aside>
      </main>
    </div>
  );
}