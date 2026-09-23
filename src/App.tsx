import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryList from "./components/CategoryList";
import { posts } from "./data/posts";
import "./App.css";

export default function App() {
  return (
    <div>
      <Navbar siteName="Group1" />

      <Hero
        title="Welcome to Group1"
        subtitle="Tutorials on React, TypeScript and modern web development"
      />

      <main className="container main-layout">
        {/* Left column: Part B */}
        <section className="column-left">
          <div className="placeholder">PostList (Part B)</div>
        </section>

        {/* Middle column: Part B + Part C */}
        <section className="column-main">
          <div className="placeholder">PostDetail (Part B)</div>
          <div className="placeholder">CommentList + CommentForm (Part C)</div>
        </section>

        {/* Right column: Part A */}
        <aside className="column-sidebar">
          <CategoryList posts={posts} />        </aside>
      </main>
    </div>
  );
}