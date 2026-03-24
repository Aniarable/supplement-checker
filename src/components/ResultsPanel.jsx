export default function ResultsPanel({ results }) {
  if (!results) return null;

  const { interactions, redundancies, timing, gaps } = results;

  const hasContent =
    interactions.length > 0 ||
    redundancies.length > 0 ||
    timing.morning.length > 0 ||
    timing.evening.length > 0 ||
    gaps.length > 0;

  if (!hasContent) {
    return <p className="results-empty">Add supplements above to see results.</p>;
  }

  return (
    <div className="results-panel">
      {interactions.length > 0 && (
        <section className="results-section">
          <h2>Interactions</h2>
          <ul>
            {interactions.map((item, i) => (
              <li key={i} className={"interaction-" + item.type}>
                <span className={"badge badge-" + item.type}>
                  {item.type === "competition" ? "Conflict" : "Synergy"}
                </span>
                <strong>{item.pair[0]}</strong> + <strong>{item.pair[1]}</strong>
                <span className="interaction-note"> -- {item.note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {redundancies.length > 0 && (
        <section className="results-section">
          <h2>Redundancies</h2>
          <ul>
            {redundancies.map((item, i) => (
              <li key={i} className="redundancy">
                <span className="badge badge-redundancy">Overlap</span>
                <strong>{item.pair[0]}</strong> and <strong>{item.pair[1]}</strong>
                <span className="redundancy-note"> -- {item.note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="results-section">
        <h2>Timing Schedule</h2>
        <div className="timing-grid">
          <div className="timing-column">
            <h3>Morning</h3>
            {timing.morning.length > 0 ? (
              <ul>
                {timing.morning.map((name) => (
                  <li key={name}>
                    {name}
                    {timing.emptyStomach.includes(name) && (
                      <span className="timing-tag"> (empty stomach)</span>
                    )}
                    {timing.withFood.includes(name) && (
                      <span className="timing-tag"> (with food)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="timing-none">None</p>
            )}
          </div>
          <div className="timing-column">
            <h3>Evening</h3>
            {timing.evening.length > 0 ? (
              <ul>
                {timing.evening.map((name) => (
                  <li key={name}>
                    {name}
                    {timing.emptyStomach.includes(name) && (
                      <span className="timing-tag"> (empty stomach)</span>
                    )}
                    {timing.withFood.includes(name) && (
                      <span className="timing-tag"> (with food)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="timing-none">None</p>
            )}
          </div>
        </div>
        {timing.spacingWarnings.length > 0 && (
          <div className="spacing-warnings">
            <h3>Spacing</h3>
            <ul>
              {timing.spacingWarnings.map((warning, i) => (
                <li key={i} className="spacing-warning">{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {gaps.length > 0 && (
        <section className="results-section">
          <h2>Suggested Additions</h2>
          <ul>
            {gaps.map((item, i) => (
              <li key={i} className="gap-suggestion">
                Consider adding <strong>{item.supplement}</strong>: {item.reason}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
