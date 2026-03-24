import { useParams } from "react-router-dom";

export default function StackPairPage() {
  const { slug } = useParams();

  return (
    <main className="pair-page">
      <h1>Can you take {slug.replace("-", " and ")} together?</h1>
      <p>SEO pair page placeholder -- worktree 4 builds this</p>

      {/* AdSense placeholder */}
      <div className="ad-slot" data-ad-slot="pair-mid" />
    </main>
  );
}
