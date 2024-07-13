import useDataTable from '~/hooks/useDataTable'
import DataTable from '../../component/DataTable'
import { stables } from '~/constants/stables'
import { UserImg } from '~/assets/image'
import { deleteUser, getAllUsers, updateUserAdmin } from '~/services/user'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRef, useState } from 'react'
function ManageUsers() {
  const [selectCheckBox, setSelectCheckBox] = useState(null)
  const {
    userState,
    data: usersData,
    deleteMutation,
    currentPage,
    search,
    setSearch,
    staleSearch,
    submitSearchTitle,
    deleteHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryKey: 'users',
    dataQueryFn: ({ token, search, currentPage }) => {
      return getAllUsers({ token, search, page: currentPage })
    },
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({ userId: slug, token })
    },
    deleteMessage: 'Delete post successfully'
  })
  const handleDeleteUser = ({ userId }) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      return deleteHandler({ slug: userId, token: userState.userInfo?.token })
    }
  }
  const userAdminMutation = useMutation({
    mutationFn: async ({ userId, token, admin }) => {
      return updateUserAdmin({ userId, token, admin })
    },
    onSuccess: () => {
      toast.success('Update user admin successfully')
    },
    onError: (error) => {
      toast.error(error.message)
      selectCheckBox.checked = !selectCheckBox.checked
    }
  })
  const handleUpdateUserAdmin = (e, { userId, admin }) => {
    const initialCheck = e.target.checked
    setSelectCheckBox(e.target)
    if (window.confirm('Are you sure you want to update this user?')) {
      userAdminMutation.mutate({ userId, token: userState.userInfo?.token, admin })
    } else {
      e.target.checked = !initialCheck
    }
  }
  return (
    <DataTable
      pageTitle={'Manage users'}
      title={'Users '}
      submitSearchTitle={submitSearchTitle}
      search={search}
      setSearch={setSearch}
      tableHeaderTitleList={['Name', 'Email', 'Verified', 'Admin', '']}
      data={usersData}
      staleSearch={staleSearch}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      <>
        {usersData.data?.data?.map((user) => (
          <tr key={user._id}>
            <td className="p-4 gap-2 border-gray-200 border-b text-sm">
              <div className="flex gap-3 items-center justify-start">
                <div className="w-10 h-10 rounded-full  overflow-hidden">
                  <img
                    className="object-cover object-center w-full h-full"
                    src={`${user.photo ? stables.UPLOAD_FOLDER_BASE_URL + user.photo : UserImg}`}
                    alt=""
                  />
                </div>
                <p className="flex-1 ">{user.name}</p>
              </div>
            </td>
            <td className="p-4 border-gray-200 border-b text-sm ">{user.email}</td>
            <td className="p-4 border-gray-200 border-b text-sm">{user.verified ? '✅' : '❌'}</td>
            <td className="p-4 border-gray-200 border-b text-sm ">
              <input
                type="checkbox"
                className="d-checkbox d-checkbox-success checked:bg-[url(../public/image/check.png)] checked:bg-cover"
                defaultChecked={user.admin}
                onChange={(e) => handleUpdateUserAdmin(e, { userId: user._id, admin: user.admin })}
              />
            </td>
            <td className="p-4 border-gray-200 border-b text-sm">
              <button
                disabled={deleteMutation.isLoading}
                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => handleDeleteUser({ userId: user._id })}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </>
    </DataTable>
  )
}

export default ManageUsers
