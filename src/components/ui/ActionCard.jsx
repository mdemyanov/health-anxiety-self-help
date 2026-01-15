import { useNavigate } from 'react-router-dom';

export default function ActionCard({
  children,
  to,
  onClick,
  className = '',
  tint,
  ...props
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigator.vibrate?.(10);
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const tintClass = tint ? `glass-tint-${tint}` : '';

  return (
    <button
      className={`action-card w-full ${tintClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </button>
  );
}
