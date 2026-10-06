
export default function Wishlisticon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      fill="none"
      viewBox="0 0 22 20"
    >
      <path
        stroke={color ? color : "#004993"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M19.058 2.191a5.3 5.3 0 0 0-1.708-1.177 5.12 5.12 0 0 0-4.029 0 5.3 5.3 0 0 0-1.707 1.177L10.6 3.238 9.586 2.191A5.18 5.18 0 0 0 5.864.601a5.18 5.18 0 0 0-3.722 1.59A5.52 5.52 0 0 0 .6 6.032a5.52 5.52 0 0 0 1.542 3.84l1.014 1.047L10.6 18.6l7.444-7.681 1.014-1.046a5.45 5.45 0 0 0 1.141-1.762 5.58 5.58 0 0 0 0-4.158 5.45 5.45 0 0 0-1.141-1.762"
      ></path>
    </svg>
  );
}
