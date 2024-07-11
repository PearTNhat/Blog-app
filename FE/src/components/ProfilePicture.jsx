import { HiOutlineCamera } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { stables } from '~/constants/stables'
import Button from './Button'
import CropEasy from './crop/CropEasy'
import { useEffect, useState } from 'react'
import { updateProfilePicture } from '~/services/user'
import { userActions } from '~/store/reducers/userReducer'
import { KEY_PICTURE } from '~/constants/profile'
import { createPortal } from 'react-dom'
function ProfilePicture({ avatar }) {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo)
  const queryClient = useQueryClient()
  const [isOpenCrop, setIsOpenCrop] = useState(false)
  const [photo, setPhoto] = useState(userInfo?.avatar)

  const pictureMutation = useMutation({
    mutationFn: ({ formData }) => updateProfilePicture({ token: userInfo.token, formData }),
    onSuccess: (data) => {
      dispatch(userActions.userChange(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
      queryClient.invalidateQueries(['profile'])
      setIsOpenCrop(false)
      toast.success('Update picture success')
    },
    onError: () => {
      toast.error('Update picture failed')
    }
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto({ url: URL.createObjectURL(file), file })
    } else {
      setPhoto(null)
    }
    setIsOpenCrop(true)
  }
  useEffect(() => {
    //clean up url when unmount or change url
    // photo.url hiện tại
    return () => {
      //photo.url trước
      photo?.url && URL.revokeObjectURL(photo.url)
    }
  }, [photo?.url])
  const handleFileDelete = async () => {
    if (!photo || !window.confirm('Are you sure to crop this image?')) return
    try {
      const formData = new FormData()
      formData.append(KEY_PICTURE, undefined)
      pictureMutation.mutate({ formData })
    } catch (error) {
      toast.error('Error when delete image')
      console.log(error)
    }
  }
  return (
    <div className="flex items-center gap-4">
      {isOpenCrop &&
        createPortal(<CropEasy photo={photo} setIsOpenCrop={setIsOpenCrop} />, document.getElementById('portal'))}
      <div className="relative w-20 h-20 outline outline-1 rounded-full overflow-hidden">
        <label htmlFor="profilePicture" className="absolute inset-0 cursor-pointer rounded-full bg-transparent">
          {avatar ? (
            <img
              src={`${stables.UPLOAD_FOLDER_BASE_URL}${avatar}`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary bg-blue-50/50">
              <HiOutlineCamera className="w-8 h-auto" />
            </div>
          )}
        </label>
        <input type="file" id="profilePicture" className="sr-only" onChange={handleFileChange} />
      </div>
      <Button cancel outline onClick={handleFileDelete}>
        Delete
      </Button>
    </div>
  )
}

export default ProfilePicture
