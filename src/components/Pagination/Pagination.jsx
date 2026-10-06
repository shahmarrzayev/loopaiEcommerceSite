import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({ 
  // func,
   pageCountApi }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
     
  // useEffect(() => {
  //   func(currentPage);
  // }, [currentPage]);

  const changePage = (page) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const generatePages = () => {
  const pages = [];

  if (pageCountApi <= 7) {
    for (let i = 1; i <= pageCountApi; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(pageCountApi - 1, currentPage + 1);

    if (currentPage <= 3) {
      startPage = 2;
      endPage = 4;
    }

    if (currentPage >= pageCountApi - 2) {
      startPage = pageCountApi - 3;
      endPage = pageCountApi - 1;
    }

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < pageCountApi - 1) {
      pages.push("...");
    }

    pages.push(pageCountApi);
  }

  return [...new Set(pages)];
};

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        {"<"}
      </button>

      {generatePages().map((page, index) =>
        page === "..." ? (
          <span key={index + 1} className="dots">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === pageCountApi}
        onClick={() => changePage(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
}