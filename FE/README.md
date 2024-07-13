node v20.10.0

queryClient.setQueryData(['posts'], data) // la no k goi lai postsQuery (useQuery) // nên sẻ trả về data củ
invalidate.invalidateQueries([])//la no goi lai postsQuery (useQuery) // trả về data mới từ database
postsQuery.refetch(): Immediately refetches data from the server for a specific query.
