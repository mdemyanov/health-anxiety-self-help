/**
 * SF Symbols-style icons for TabBar
 * Each icon has outline (inactive) and filled (active) variants
 * Following Apple HIG: filled for active, outline for inactive
 */

// Home icon - house shape
export const HomeIcon = ({ size = 24, filled = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {filled ? (
      // Filled variant
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.5Z"
        fill="currentColor"
      />
    ) : (
      // Outline variant
      <>
        <path
          d="M3 10.5L12 3L21 10.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12H15V22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

// Tools/Wrench icon
export const ToolsIcon = ({ size = 24, filled = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {filled ? (
      <path
        d="M14.7 6.3C14.5 6.1 14.5 5.9 14.7 5.7L18.4 2C16.8 1.4 14.9 1.7 13.5 3.1C11.9 4.7 11.6 7.1 12.6 9L4.9 16.7C4.1 17.5 4.1 18.8 4.9 19.6C5.7 20.4 7 20.4 7.8 19.6L15.5 11.9C17.4 12.9 19.8 12.6 21.4 11C22.8 9.6 23.1 7.7 22.5 6.1L18.8 9.8C18.6 10 18.4 10 18.2 9.8L14.7 6.3Z"
        fill="currentColor"
      />
    ) : (
      <path
        d="M14.7 6.3C14.5 6.1 14.5 5.9 14.7 5.7L18.4 2C16.8 1.4 14.9 1.7 13.5 3.1C11.9 4.7 11.6 7.1 12.6 9L4.9 16.7C4.1 17.5 4.1 18.8 4.9 19.6C5.7 20.4 7 20.4 7.8 19.6L15.5 11.9C17.4 12.9 19.8 12.6 21.4 11C22.8 9.6 23.1 7.7 22.5 6.1L18.8 9.8C18.6 10 18.4 10 18.2 9.8L14.7 6.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

// Book icon for Stoics
export const BookIcon = ({ size = 24, filled = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {filled ? (
      <>
        <path
          d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20V3H6.5C5.83696 3 5.20107 3.26339 4.73223 3.73223C4.26339 4.20107 4 4.83696 4 5.5V19.5Z"
          fill="currentColor"
        />
        <path
          d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20V21H6.5C5.83696 21 5.20107 20.7366 4.73223 20.2678C4.26339 19.7989 4 19.163 4 18.5V19.5Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </>
    ) : (
      <>
        <path
          d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 3H20V21H6.5C5.83696 21 5.20107 20.7366 4.73223 20.2678C4.26339 19.7989 4 19.163 4 18.5V5.5C4 4.83696 4.26339 4.20107 4.73223 3.73223C5.20107 3.26339 5.83696 3 6.5 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

// Calendar icon for Diary
export const CalendarIcon = ({ size = 24, filled = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {filled ? (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" />
        <rect x="3" y="4" width="18" height="6" rx="2" fill="currentColor" fillOpacity="0.7" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="2"
          x2="8"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="10"
          x2="21"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);
