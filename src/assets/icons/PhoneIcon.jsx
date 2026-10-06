
export default function PhoneIcon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
    >
      <path
        stroke={color ? color : "#1072A0"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.515.75h3.53l1.764 4.412-2.206 1.323a9.7 9.7 0 0 0 4.412 4.412l1.323-2.206 4.412 1.765v3.53a1.764 1.764 0 0 1-1.765 1.764A14.12 14.12 0 0 1 .75 2.515 1.765 1.765 0 0 1 2.515.75"
      ></path>
    </svg>
  );
}
