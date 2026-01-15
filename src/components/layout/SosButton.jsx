import { useNavigate } from 'react-router-dom';

export default function SosButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigator.vibrate?.([20, 50, 20]);
    navigate('/sos');
  };

  return (
    <button
      onClick={handleClick}
      className="sos-btn fixed bottom-24 right-4 w-14 h-14 rounded-full flex items-center justify-center z-40 border-none cursor-pointer text-white font-bold"
      aria-label="SOS - экстренная помощь"
    >
      SOS
    </button>
  );
}
