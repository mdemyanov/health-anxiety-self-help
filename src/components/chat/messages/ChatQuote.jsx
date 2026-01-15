export default function ChatQuote({
  text,
  author,
  items
}) {
  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          {text && (
            <blockquote className="text-base italic mb-2">
              "{text}"
            </blockquote>
          )}

          {author && (
            <p
              className="text-sm text-right"
              style={{ color: 'var(--label-secondary)' }}
            >
              — {author}
            </p>
          )}

          {items && items.length > 0 && (
            <ul className="mt-3 space-y-2">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--label-secondary)' }}
                >
                  <span style={{ color: 'var(--apple-blue)' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
