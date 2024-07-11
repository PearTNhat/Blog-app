/* eslint-disable indent */
import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Pagination from '~/components/Pagination'
function DataTable({
  pageTitle,
  title,
  submitSearchTitle,
  search,
  setSearch,
  tableHeaderTitleList,
  data,
  staleSearch,
  currentPage,
  setCurrentPage,
  children
}) {
  const isLoading = data?.isLoading
  const isFetching = data?.isFetching

  return (
    <div className="p-1">
      <h1 className="text-2xl">{pageTitle}</h1>
      <div className="p-8">
        <div className="flex justify-between">
          <h2 className="text-2xl">{title}</h2>
          <form className="flex gap-3" onSubmit={(e) => submitSearchTitle(e)}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search title"
                className="px-4 py-[0.625rem] border-gray-200 border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={search}
                onChange={(e) => {
                  let value = e.target.value
                  if (value.startsWith(' ')) {
                    value = value.trim()
                  }
                  setSearch(value)
                }}
              />
            </InputGroup>
            <Button type="submit" small>
              Search
            </Button>
          </form>
        </div>
        <div className="py-4">
          <div className="shadow">
            <table className="w-full">
              <thead className="">
                <tr className="border-gray-200 border-b">
                  {tableHeaderTitleList.map((title) => (
                    <th key={title} className="text-left p-4 font-normal" scope="col">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <tr>
                    <td colSpan={5} className="text-2xl text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : data.data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-xl text-center text-gray-500">
                      {`No posts were found ${staleSearch ? `with search term "${staleSearch}"` : ''} `}
                    </td>
                  </tr>
                ) : (
                  children
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            siblingCount={1}
            totalPageCount={JSON.parse(data.data?.headers?.['x-total-page-count'] || null)}
          />
        </div>
      </div>
    </div>
  )
}

export default DataTable
