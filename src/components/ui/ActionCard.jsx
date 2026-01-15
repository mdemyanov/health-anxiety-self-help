import { useNavigate } from 'react-router-dom';

export default function ActionCard({
  children,
  to,
  onClick,
  className = '',
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

  return (
    <button
      className={`action-card w-full ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
