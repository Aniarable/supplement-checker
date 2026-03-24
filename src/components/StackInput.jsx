import { useState, useRef, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import supplements from "../data/supplements.json";
import "./StackInput.css";

const fuse = new Fuse(supplements, {
  keys: ["supplement", "aliases"],
  threshold: 0.4,
  includeScore: true,
});

const POPULAR = [
  "vitamin-d", "magnesium", "omega-3", "zinc", "ashwagandha",
  "creatine", "vitamin-c", "iron", "probiotics", "vitamin-k2",
  "turmeric", "b-complex", "coq10", "l-theanine", "NAC",
];

export default function StackInput({ stack, setStack }) {
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse
      .search(query)
      .filter((r) => !stack.includes(r.item.supplement))
      .slice(0, 8);
  }, [query, stack]);

  useEffect(() => {
    setHighlightIndex(-1);
    setIsOpen(results.length > 0);
  }, [results]);

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIndex];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  function addSupplement(name) {
    if (!stack.includes(name)) {
      setStack([...stack, name]);
    }
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function removeSupplement(name) {
    setStack(stack.filter((s) => s !== name));
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && results[highlightIndex]) {
        addSupplement(results[highlightIndex].item.supplement);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    } else if (e.key === "Backspace" && !query && stack.length > 0) {
      removeSupplement(stack[stack.length - 1]);
    }
  }

  return (
    <div className="stack-input">
      <div className="stack-input-box" onClick={() => inputRef.current?.focus()}>
        {stack.map((name) => (
          <span key={name} className="stack-tag">
            {name}
            <button
              type="button"
              className="stack-tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeSupplement(name);
              }}
              aria-label={`Remove ${name}`}
            >
              x
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="stack-input-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={stack.length === 0 ? "Type a supplement..." : ""}
          aria-label="Search supplements"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />
      </div>

      {stack.length < 3 && (
        <div className="stack-suggestions">
          <span className="stack-suggestions-label">Popular:</span>
          {POPULAR.filter((name) => !stack.includes(name)).map((name) => (
            <button
              key={name}
              type="button"
              className="stack-suggestion-chip"
              onClick={() => addSupplement(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul className="stack-dropdown" ref={listRef} role="listbox">
          {results.map((r, i) => (
            <li
              key={r.item.supplement}
              className={`stack-dropdown-item${i === highlightIndex ? " highlighted" : ""}`}
              onMouseDown={() => addSupplement(r.item.supplement)}
              onMouseEnter={() => setHighlightIndex(i)}
              role="option"
              aria-selected={i === highlightIndex}
            >
              <span className="stack-dropdown-name">{r.item.supplement}</span>
              {r.item.category && (
                <span className="stack-dropdown-cat">{r.item.category}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
