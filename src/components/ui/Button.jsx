export default function Button({
  children,
  variant = 'filled',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = {
    filled: 'btn-filled',
    tinted: 'btn-tinted',
    gray: 'btn-gray',
    glass: 'btn-glass',
  }[variant] || 'btn-filled';

  const handleClick = (e) => {
    navigator.vibrate?.(10);
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
