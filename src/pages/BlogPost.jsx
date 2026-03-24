import { useParams, Link } from "react-router-dom";
import posts from "../data/blog-posts.json";

function renderBody(text) {
  // Split into paragraphs, handle **bold**, [links](url), and | tables |
  return text.split("\n\n").map((block, i) => {
    // Table detection
    if (block.includes("|") && block.split("\n").length > 1) {
      const rows = block.split("\n").filter((r) => r.trim().startsWith("|"));
      if (rows.length < 2) return <p key={i}>{block}</p>;
      const header = rows[0].split("|").filter(Boolean).map((c) => c.trim());
      const dataRows = rows.slice(2); // skip header + separator
      return (
        <table key={i} className="blog-table">
          <thead>
            <tr>{header.map((h, j) => <th key={j}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri}>
                {row.split("|").filter(Boolean).map((cell, ci) => (
                  <td key={ci}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // List detection
    if (block.split("\n").every((line) => line.match(/^- /))) {
      return (
        <ul key={i}>
          {block.split("\n").map((line, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^- /, "")) }} />
          ))}
        </ul>
      );
    }

    // Regular paragraph
    return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(block) }} />;
  });
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br/>");
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="blog-post-page">
        <h1>Post not found</h1>
        <Link to="/blog">Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className="blog-post-page">
      <Link to="/blog" className="terms-back">&larr; Back to Blog</Link>

      <article>
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <p className="blog-post-meta">{post.date} &middot; {post.readTime} read</p>
        </header>

        <p className="blog-post-intro">{post.intro}</p>

        {post.sections.map((section, i) => (
          <section key={i} className="blog-post-section">
            <h2>{section.heading}</h2>
            {renderBody(section.body)}
          </section>
        ))}
      </article>

      <footer className="disclaimer-footer">
        <p>
          This article is for <strong>educational purposes only</strong> and does not
          constitute medical advice. Always consult a qualified healthcare provider
          before starting, stopping, or changing any supplement regimen.
        </p>
        <p><Link to="/terms">Terms of Use & Disclaimer</Link> | <Link to="/privacy">Privacy Policy</Link></p>
      </footer>
    </main>
  );
}
