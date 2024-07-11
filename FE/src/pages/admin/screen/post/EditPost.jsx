import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import Button from '~/components/Button'
import ErrorMessage from '~/components/ErrorMessage'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import { stables } from '~/constants/stables'
import ArticleDetailSkeleton from '~/pages/articleDetail/components/ArticleDetailSkeleton'
import { getSinglePost } from '~/services/post'
import { updatePost } from '~/services/post'
import toast from 'react-hot-toast'
import Editor from '~/components/edit/Editor'
import MultiSelectTagDropDown from '../../component/selectDropDown/MultiSelectTagDropDown'
import { categoriesToOptions, promiseOptionsCategories } from '~/utils/multiSelectTagUtils'
function EditPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const userState = useSelector((state) => state.user.userInfo)
  const [body, setBody] = useState(null)
  const [initialPhoto, setInitialPhoto] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [categories, setCategories] = useState([])
  const [attrPost, setAttrPost] = useState({
    title: null,
    tags: null,
    slug: slug,
    caption: null
  })
  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getSinglePost({ slug }),
    onSuccess: (data) => {
      const d = data.data
      setInitialPhoto(d?.photo)
      setCategories(d?.categories)
      setBody(data.data?.body)
      setAttrPost({ title: d?.title, tags: d?.tags, slug: d?.slug, caption: d?.caption })
    }
  })
  const updatePostMutation = useMutation({
    mutationFn: async ({ slug, token, updatePostData }) => {
      return updatePost({ slug, token, updatePostData })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blog', attrPost.slug])
      const d = data.data
      if (d.slug !== slug) {
        navigate(`/admin/posts/manage/edit/${d.slug}`, { replace: true })
      }
      toast.success('Update post successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const deletePhotoHandler = () => {
    setPhoto(null)
    setInitialPhoto(null)
  }
  const changePhotoHandler = (e) => {
    setPhoto(e.target.files[0])
  }
  const changeSlugHandler = (e) => {
    const newSlug = e.target.value.replace(/\s+/g, '-').toLowerCase()
    setAttrPost({ ...attrPost, slug: newSlug })
  }
  const updatePostHandler = async () => {
    const updatePostData = new FormData()
    // update new photo
    if (photo || !initialPhoto) {
      updatePostData.append('postPicture', photo)
    } else if (initialPhoto) {
      // keep the old photo
      const urlToObj = async (url) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], initialPhoto, { type: blob.type })
        return file
      }
      updatePostData.append('postPicture', await urlToObj(`${stables.UPLOAD_FOLDER_BASE_URL + initialPhoto}`))
    }
    updatePostData.append('documents', JSON.stringify({ ...attrPost, body, categories }))
    updatePostMutation.mutate({ slug, token: userState.token, updatePostData })
  }
  const isPostDataLoaded = !isLoading && !isError
  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage className={'mt-header-height p-5'} message={"Couldn't fetch the post data"} />
      ) : (
        <section className="p-5">
          <div className="flex flex-col lg:gap-4 h-[calc(100vh-1.25rem) ]">
            <article className="">
              <InputGroup className="select-none  rounded-xl overflow-hidden">
                <Label htmlFor="updatePicturePost" className="cursor-pointer">
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="post-img" className='m-auto' />
                  ) : initialPhoto ? (
                    <img src={`${stables.UPLOAD_FOLDER_BASE_URL + initialPhoto}`} alt="post-img" className='m-auto' />
                  ) : (
                    <div className="min-h-[200px] bg-gray-200 flex justify-center items-center">
                      <AiOutlineCamera className="text-blue-500 text-3xl" />
                    </div>
                  )}
                </Label>
                <Input type="file" id="updatePicturePost" className="sr-only" onChange={changePhotoHandler} />
              </InputGroup>
              <Button className="!p-2 !my-1 bg-red-500 border-red-500 mt-2 hover:bg-red-600" onClick={deletePhotoHandler}>
                Delete Photo
              </Button>
              <InputGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  className="text-2xl p-1 text-dark-hard outline-none w-full focus:shadow-[0_0_0_1px_#2684FF]  focus:border-[#2684FF] border border-slate-400 rounded-md"
                  defaultValue={attrPost.title}
                  onChange={(e) => {
                    setAttrPost({ ...attrPost, title: e.target.value })
                  }}
                />
              </InputGroup>
              <div className="my-5">
                <Label className="block mb-2" htmlFor="caption">
                  Caption
                </Label>
                <Input
                  id="caption"
                  type="text"
                  className="text-xl p-1 text-dark-hard outline-none w-full focus:shadow-[0_0_0_1px_#2684FF]  focus:border-[#2684FF] border border-slate-400 rounded-md"
                  value={attrPost.caption || ''}
                  onChange={(e) => setAttrPost({ ...attrPost, caption: e.target.value })}
                />
              </div>
              <div className="my-5">
                <Label className="block mb-2" htmlFor="slug">
                  Slug
                </Label>
                <Input
                  id="slug"
                  type="text"
                  className="text-2xl p-1 text-dark-hard outline-none w-full focus:shadow-[0_0_0_1px_#2684FF]  focus:border-[#2684FF] border border-slate-400 rounded-md"
                  value={attrPost.slug}
                  onChange={changeSlugHandler}
                />
              </div>
              <div className="my-5">
                <Label className="block mb-2">Tags</Label>
                {isPostDataLoaded && (
                  <CreatableSelect
                    defaultValue={postData.data?.tags.map((tag) => ({ label: tag, value: tag }))}
                    isMulti
                    onChange={(newOption) => {
                      setAttrPost({ ...attrPost, tags: newOption.map((option) => option.value) })
                    }}
                  />
                )}
              </div>

              <div className="my-5">
                <Label className="block mb-2">Categories</Label>
                {isPostDataLoaded && (
                  <MultiSelectTagDropDown
                    defaultValue={postData?.data.categories.map(categoriesToOptions)}
                    loadOptions={promiseOptionsCategories}
                    onChange={(newOption) => {
                      setCategories(newOption.map((option) => option.value))
                    }}
                  />
                )}
              </div>
              <div className="w-full my-2">
                {isPostDataLoaded && (
                  <Editor content={postData?.data.body} editable={true} onDataChange={(data) => setBody(data)} />
                )}
              </div>
            </article>
            <Button disabled={updatePostMutation.isLoading} onClick={updatePostHandler}>
              Save
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}

export default EditPost
