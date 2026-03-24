export default function AdPlaceholder({ slot = 'default' }) {
  return (
    <div className="ad-placeholder" data-ad-slot={slot}>
      <span className="ad-label">Advertisement</span>
    </div>
  )
}
