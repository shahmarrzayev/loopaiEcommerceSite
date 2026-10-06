
export default function ProductInWishlistIcon({color}) {
  return(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="17"
    fill="none"
    viewBox="0 0 19 17"
  >
    <path
      fill={color ? color : "#fff"}
      stroke={color ? color : "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
      d="M16.67 1.965a4.6 4.6 0 0 0-1.486-1.01 4.52 4.52 0 0 0-3.508 0 4.6 4.6 0 0 0-1.487 1.01l-.883.898-.883-.898A4.55 4.55 0 0 0 5.183.601C3.966.6 2.8 1.09 1.941 1.965A4.7 4.7 0 0 0 .6 5.26a4.7 4.7 0 0 0 1.342 3.295l.883.898 6.481 6.59 6.481-6.59.883-.898c.426-.433.764-.946.994-1.512a4.73 4.73 0 0 0 0-3.566 4.7 4.7 0 0 0-.994-1.512"
    ></path>
  </svg>
  )
}
