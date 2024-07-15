import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import { getSingleCategory, updateCategory } from '~/services/postCategories'

function EditCategory() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user.userInfo)
  const queryClient = useQueryClient()
  const [categoryTitle, setCategoryTitle] = useState('')
  useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getSingleCategory({ categoryId }),
    onSuccess: (data) => {
      setCategoryTitle(data.title)
    },
    onError: () => {
      toast.error('Failed to get category data')
    }
  })
  const updateMutation = useMutation({
    mutationFn: ({ categoryId, title, token }) => {
      return updateCategory({ categoryId, title, token })
    },
    onSuccess: () => {
      navigate(`/admin/categories/manage/`, { replace: true })
      toast.success('Update post successfully')
    },
    onError: () => {
      toast.error("Failed to update post's data")
    }
  })
  const updateCategoryHandler = () => {
    updateMutation.mutate({ categoryId, title: categoryTitle, token: userState.token })
  }
  return (
    <InputGroup>
      <Label htmlFor="create-category" className="text-black !text-2xl font-normal">
        Edit category
      </Label>
      <Input
        id="create-category"
        type="text"
        placeholder="Typing category name"
        className="my-2 text-xl p-2 text-dark-hard outline-none w-full focus:shadow-[0_0_0_1px_#2684FF]  focus:border-[#2684FF] border border-slate-400 rounded-md"
        value={categoryTitle}
        onChange={(e) => {
          setCategoryTitle(e.target.value)
        }}
      />
      <div className="flex gap-4 justify-center">
        <Button
          cancel
          onClick={() => {
            navigate(`/admin/categories/manage`, { replace: true })
          }}
        >
          Cancel
        </Button>
        <Button disabled={updateMutation.isLoading} onClick={updateCategoryHandler}>
          Edit
        </Button>
      </div>
    </InputGroup>
  )
}

export default EditCategory
