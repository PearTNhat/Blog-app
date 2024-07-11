import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

let isFirstRun = true
function useDataTable({ dataQueryKey, dataQueryFn, mutateDeleteFn, deleteMessage, mutateCreateFn, createMessage }) {
  const userState = useSelector((state) => state.user)
  const queryClient = useQueryClient()
  const [staleSearch, setStaleSearch] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const data = useQuery({
    queryKey: [dataQueryKey],
    queryFn: () => dataQueryFn({ search, currentPage, token: userState.userInfo.token }),
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const deleteMutation = useMutation({
    mutationFn: mutateDeleteFn,
    onSuccess: () => {
      if (data.data?.data?.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else {
        queryClient.invalidateQueries([dataQueryKey])
      }
      toast.success(deleteMessage)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const createMutation = useMutation({
    mutationFn: mutateCreateFn,
    onSuccess: () => {
      queryClient.invalidateQueries([dataQueryKey])
      toast.success(createMessage)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const deleteHandler = ({ slug, token }) => {
    deleteMutation.mutate({ slug, token })
  }
  const createHandler = ({ title, token }) => {
    createMutation.mutate({ title, token })
  }
  const submitSearchTitle = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setStaleSearch(search)
    data.refetch()
  }
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false
      return
    }
    data.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  return {
    userState,
    data,
    deleteMutation,
    createHandler,
    currentPage,
    search,
    setSearch,
    staleSearch,
    submitSearchTitle,
    deleteHandler,
    setCurrentPage
  }
}

export default useDataTable
