
import { usePagination, DOTS } from '~/hooks/usePagination'
function Pagination({ onPageChange, siblingCount = 1, currentPage, totalPageCount }) {
  const paginationRange = usePagination({ currentPage, totalPageCount, siblingCount })
  if (paginationRange?.length < 1 || currentPage === 0) return null
  const onNext = () => onPageChange(currentPage + 1)
  const onPrevious = () => onPageChange(currentPage - 1)
  return (
    <div className="flex items-center justify-center p-4">
      <button
        type="button"
        disabled={currentPage === 1}
        className={`${currentPage === 1 && 'cursor-not-allowed disabled:bg-gray-200'
          } w-[40px] h-[40px] flex justify-center items-center text-base text-gray-600 bg-white border-t border-b border-l rounded-l-xl hover:bg-gray-100`}
        onClick={() => {
          onPrevious()
        }}
      >
        <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <button key={index} className={` w-[40px] h-[40px] border border-gray-200 hover:bg-gray-100 bg-white`}>
              &#8230;
            </button>
          )
        }
        if (currentPage === pageNumber) {
          return (
            <button key={index} className="w-[40px] h-[40px] border border-gray-200 bg-primary">
              {pageNumber}
            </button>
          )
        }
        return (
          <button
            key={index}
            className="w-[40px] h-[40px] border border-gray-200 hover:bg-gray-100 bg-white"
            onClick={() => {
              onPageChange(pageNumber)
            }}
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        type="button"
        disabled={currentPage === totalPageCount}
        className={`${currentPage === totalPageCount && 'cursor-not-allowed disabled:bg-gray-200'
          } w-[40px] h-[40px] flex justify-center items-center text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100`}
        onClick={() => {
          onNext()
        }}
      >
        <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
    </div>
  )
}

export default Pagination
