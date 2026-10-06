export default function ShowPasswordIcon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="18"
      fill="none"
      viewBox="0 0 24 18"
    >
      <path
        stroke={color ? color : "rgba(1, 1, 1, 1)"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22.028 7.876a1.834 1.834 0 0 1 0 2.249C20.411 12.236 16.53 16.584 12 16.584s-8.411-4.348-10.029-6.46a1.83 1.83 0 0 1 0-2.248C3.59 5.764 7.47 1.417 12 1.417s8.41 4.347 10.028 6.459"
      ></path>
      <path
        stroke={color ? color : "rgba(1, 1, 1, 1)"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5"
      ></path>
    </svg>
  );
}
