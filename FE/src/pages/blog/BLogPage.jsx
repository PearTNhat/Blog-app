/* eslint-disable react-hooks/exhaustive-deps */
import { getAllPosts } from '~/services/post'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import ArticleCard from '~/components/ArticleCard'
import ArticleCardSkeleton from '~/components/ArticleCardSkeleton'
import ErrorMessage from '~/components/ErrorMessage'
import Pagination from '~/components/Pagination'
import MainLayout from '~/sections/MainLayout'
import Search from '~/components/Search'
import { promiseOptionsCategories } from '~/utils/multiSelectTagUtils'
import AsyncSelect from 'react-select/async'
const LIMIT = 6
let isFirstRun = true
function BLogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsValue = Object.fromEntries([...searchParams])
  const [currentPage, setCurrentPage] = useState(searchParamsValue.page || 1)
  const [search, setSearch] = useState(searchParamsValue.search || '')
  const [category, setCategory] = useState(searchParamsValue.category || '')
  const [isClickSearch, setIsClickSearch] = useState(false)
  // khi thay dổi categories bấm search thì sẻ search\
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return getAllPosts({ search: search, page: currentPage, limit: LIMIT, category })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const isLoading = postsQuery.isLoading
  const isFetching = postsQuery.isFetching
  const handleSearchSubmit = (e, searchKeyWord) => {
    if (setSearch === null) return
    e.preventDefault()
    setSearch(searchKeyWord)
    setIsClickSearch(prev => !prev)
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (isFirstRun) {
      isFirstRun = false
      return
    }
    setSearchParams({ page: 1, search: search, category })
    postsQuery.refetch()
  }, [currentPage, isClickSearch])
  return (
    <MainLayout>
      <section className="max-container px-4 py-10 mt-header-height ">
        {/*  do co flex-col ở trên nên dưới phải có w-full để cho chiều ngang 100% */}
        <Search
          className={'mb-6'}
          handleSubmit={handleSearchSubmit}
          search={search}
          isLoading={isLoading}
          isFetching={isFetching}
        />
        <div className="mb-4 flex justify-center">
          <AsyncSelect
            value={category && { value: category, label: category }}
            loadOptions={promiseOptionsCategories}
            defaultOptions
            onChange={(newOption) => {
              const label = newOption.label === "Remove category" ? "" : newOption.label
              setCategory(label)
            }}
            placeholder="Select categories"
            className="relative z-20  w-[300px]"
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full">
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <ArticleCardSkeleton className={'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]'} key={index} />
            ))
          ) : postsQuery.isError ? (
            <ErrorMessage message={"Couldn't fetch the posts data"} />
          ) : postsQuery.data?.data.length == 0 ? (
            <div className="flex-1 text-center text-2xl">Do not have post</div>
          ) : (
            postsQuery.data?.data.map((post) => {
              return (
                <ArticleCard
                  key={post._id}
                  className={'w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]'}
                  post={post}
                />
              )
            })
          )}
        </div>
      </section>
      <Pagination
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        siblingCount={1}
        totalPageCount={JSON.parse(postsQuery.data?.headers?.['x-total-page-count'] || null)}
      />
    </MainLayout>
  )
}

export default BLogPage
