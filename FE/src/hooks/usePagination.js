import { useMemo } from 'react'
const DOTS = '...'
function usePagination({ siblingCount = 1, totalPageCount, currentPage }) {
  const paginationRange = useMemo(() => {
    // total page numbers to be shown in the pagination
    const totalPageNumbers = 5 + siblingCount
    // state 1 : if page number less than totalPageNumbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }
    //calculating the left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
    // calculating that we want to show the left dots or right dots, or both of them
    // we don't show dots just when there is just one page number to be inserted between the sibling and page limit
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount
    // State 2: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, lastPageIndex]
    }
    // State 3 : No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }
    // State 4 : Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [siblingCount, totalPageCount, currentPage])
  return paginationRange
}
function range(start, end) {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
export { usePagination, DOTS }
