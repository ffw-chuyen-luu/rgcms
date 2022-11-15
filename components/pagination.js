import Link from "next/link";

export default function Pagination({ basePath, currentPage, totalPages }) {

  const prevPageUrl =
    currentPage === 2
      ? `/${basePath}`
      : `/${basePath}/page/${parseInt(currentPage, 10) - 1}`;
  const nextPageUrl = `/blog/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <div className="w-full flex items-center justify-center">
      <div className="inline-flex items-center justify-center gap-3">
        {
          (currentPage - 1) === 0 ? (
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300">
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <Link
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300"
              href={prevPageUrl}>
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )
        }

        <p className="text-xs">
          {currentPage}
          <span className="mx-0.25">/</span>
          {totalPages}
        </p>

        {
          currentPage === totalPages ? (
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300">
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <Link
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300"
              href={nextPageUrl}>
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )
        }
      </div>
    </div>
  )

}
