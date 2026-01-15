export default function Card({
  children,
  className = '',
  onClick,
  elevated = false,
  as: Component = 'div',
  ...props
}) {
  const handleClick = onClick ? (e) => {
    navigator.vibrate?.(10);
    onClick(e);
  } : undefined;

  const cardClass = elevated ? 'liquid-glass-elevated' : 'card';

  return (
    <Component
      className={`${cardClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}
