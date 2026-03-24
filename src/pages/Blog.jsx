import { Link } from "react-router-dom";
import posts from "../data/blog-posts.json";

const CATEGORY_LABELS = {
  safety: "Safety",
  stacks: "Stacks",
  guides: "Guides",
};

export default function Blog() {
  return (
    <main className="blog-page">
      <Link to="/" className="terms-back">&larr; Back to Checker</Link>
      <h1>Supplement Blog</h1>
      <p className="blog-intro">Evidence-based guides, stacking strategies, and safety tips.</p>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link key={post.slug} to={"/blog/" + post.slug} className="blog-card">
            <span className="blog-card-category">{CATEGORY_LABELS[post.category] || post.category}</span>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-desc">{post.metaDescription}</p>
            <span className="blog-card-meta">{post.date} &middot; {post.readTime} read</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
