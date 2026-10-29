const paths = {
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2" />
    </>
  ),
  map: (
    <>
      <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16M15 5v16" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4c5-4 9 4 14 0v10c-5 4-9-4-14 0" />
    </>
  ),
  settings: (
    <>
      <path d="m10 3-1 3-3 1-3 3 2 3v4l4 1 2 3 3-2 4-1 1-4 2-3-3-3-3-1-2-3Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </>
  ),
  chevron: <path d="m9 5 7 7-7 7" />,
  back: <path d="m14 5-7 7 7 7" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5ZM6 11v6c4 3 8 3 12 0v-6M22 9v7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  traffic: (
    <>
      <path d="m5 10 2-6h10l2 6M4 17v3M20 17v3" />
      <rect x="3" y="10" width="18" height="7" rx="2" />
      <path d="M6 13h2m8 0h2" />
    </>
  ),
  construction: (
    <>
      <path d="m5 9 2-5h10l2 5M3 13V9h18v4M5 13v8m14-8v8M3 17h18M9 9l4 4m2-4 4 4" />
    </>
  ),
  warning: (
    <>
      <path d="m10.2 4-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.8-3l-8-14a2 2 0 0 0-3.6 0Z" />
      <path d="M12 9v4m0 4h.01" />
    </>
  ),
  walk: (
    <>
      <circle cx="14" cy="4" r="2" />
      <path d="m7 10 5-3 3 5 4 1M12 7l-2 8-5 6m5-6 5 2v5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
    </>
  ),
  logout: (
    <>
      <path d="M9 3H4v18h5M9 12h12m-5-5 5 5-5 5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6m0-10h.01" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C7 2 2 8 5 15s17 5 15-12Z" />
      <path d="M3 21 15 9" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-3v19M12 7h8v14M2 21h20M7 7h2M7 11h2M7 15h2M15 11h2M15 15h2" />
    </>
  ),
  swap: (
    <>
      <path d="M7 3v17m-4-4 4 4 4-4M17 21V4m-4 4 4-4 4 4" />
    </>
  ),
};

export default function Icon({ name, size = 22, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.pin}
    </svg>
  );
}
