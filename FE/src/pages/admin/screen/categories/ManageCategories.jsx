import useDataTable from '~/hooks/useDataTable'
import DataTable from '../../component/DataTable'
import { createCategory, deletePostCategory, getAllPostCategories } from '~/services/postCategories'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import Input from '~/components/InputGroup/Input'
import Button from '~/components/Button'

function ManageCategories() {
  const [category, setCategory] = useState('')
  const {
    userState,
    data: categoriesData,
    deleteMutation,
    currentPage,
    search,
    setSearch,
    staleSearch,
    createHandler,
    deleteHandler,
    submitSearchTitle,
    setCurrentPage
  } = useDataTable({
    dataQueryKey: 'categories',
    dataQueryFn: ({ search, currentPage }) => {
      return getAllPostCategories({ search, page: currentPage })
    },
    mutateCreateFn: ({ title, token }) => {
      return createCategory(title, token)
    },
    createMessage: 'Create category successfully',
    mutateDeleteFn: ({ slug: categoryId, token }) => {
      return deletePostCategory(categoryId, token)
    },
    deleteMessage: 'Delete post successfully'
  })
  const createCategoryHandler = () => {
    createHandler({ title: category, token: userState.userInfo.token })
    setCategory('')
  }
  return (
    <div className="grid grid-cols-12 gap-4 p-2">
      <div className="col-span-12 xl:col-span-4">
        <InputGroup>
          <Label htmlFor="create-category" className="text-black !text-2xl font-normal">
            Create new category
          </Label>
          <Input
            id="create-category"
            type="text"
            placeholder="Typing category name"
            className="my-2 text-xl p-2 text-dark-hard outline-none w-full focus:shadow-[0_0_0_1px_#2684FF]  focus:border-[#2684FF] border border-slate-400 rounded-md"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          />
          <Button widthFull onClick={createCategoryHandler}>
            Create
          </Button>
        </InputGroup>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <DataTable
          pageTitle={'Manage Categories'}
          title={'Categories'}
          submitSearchTitle={submitSearchTitle}
          search={search}
          setSearch={setSearch}
          tableHeaderTitleList={['Title', 'Create at', '']}
          data={categoriesData}
          staleSearch={staleSearch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        >
          <>
            {categoriesData.data?.data?.map((category) => (
              <tr key={category._id}>
                <td className="p-4 border-gray-200 border-b text-sm">
                  <p> {category.title} </p>
                </td>
                <td className="p-4 border-gray-200 border-b text-sm">
                  <p>
                    {new Date(category.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </td>
                <td className="p-4 border-gray-200 border-b text-sm">
                  <button
                    disabled={deleteMutation.isLoading}
                    className="mr-3 text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => {
                      deleteHandler({ slug: category._id, token: userState.userInfo?.token })
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/admin/categories/manage/${category._id}`} className="text-green-600 hover:text-green-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </>
        </DataTable>
      </div>
    </div>
  )
}

export default ManageCategories
