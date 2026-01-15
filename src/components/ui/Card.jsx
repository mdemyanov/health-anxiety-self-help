export default function Card({
  children,
  className = '',
  onClick,
  as: Component = 'div',
  ...props
}) {
  const handleClick = onClick ? (e) => {
    navigator.vibrate?.(10);
    onClick(e);
  } : undefined;

  return (
    <Component
      className={`card ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
}
