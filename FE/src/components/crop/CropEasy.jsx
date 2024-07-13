import { useState } from 'react'
import Cropper from 'react-easy-crop'
import Button from '../Button'
import getCroppedImg from './cropImage'
import toast from 'react-hot-toast'
import { updateProfilePicture } from '~/services/user'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userActions } from '~/store/reducers/userReducer'
import { KEY_PICTURE } from '~/constants/profile'
//bien o day k reset kh rerender
let staleUrl = null

function CropEasy({ photo, setIsOpenCrop }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const userInfo = useSelector((state) => state.user.userInfo)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const pictureMutation = useMutation({
    mutationFn: ({ formData }) => updateProfilePicture({ token: userInfo.token, formData }),
    onSuccess: (data) => {
      dispatch(userActions.userChange(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
      queryClient.invalidateQueries(KEY_PICTURE)
      setIsOpenCrop(false)
      toast.success('Update picture success')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  const handleCancel = () => {
    setIsOpenCrop(false)
  }
  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(photo.url, croppedAreaPixels)
      staleUrl && URL.revokeObjectURL(staleUrl)
      staleUrl = croppedImage.url
      console.log('croppedImage.file', croppedImage.file)
      const file = new File([croppedImage.file], `${photo?.file?.name}`, { type: photo?.file?.type })
      const formData = new FormData()
      formData.append(KEY_PICTURE, file)
      pictureMutation.mutate({ formData })
    } catch (error) {
      toast.error('Error when crop image')
    }
  }
  return (
    <div className=" fixed bg-black/50 inset-0 z-[1000] flex items-center justify-center">
      <div className="bg-white w-[350px]  p-5 rounded-xl">
        <h2 className="text-center font-semibold text-3xl mb-2">Crop image</h2>
        <div className="relative aspect-square rounded-xl overflow-hidden ">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropAreaChange={onCropComplete}
          />
        </div>
        <div className="my-4">
          <label htmlFor="zoomRange" className="block text-dark-hard font-bold">
            Zoom: {Math.round(zoom * 100)}%
          </label>
          <input
            type="range"
            step={0.1}
            min={1}
            max={3}
            value={zoom}
            // appearance-none to custom input range
            className="w-full appearance-none bg-gray-300 h-1 rounded-full"
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-2 max-sm:flex-col ">
          <Button cancel small onClick={handleCancel} disabled={pictureMutation.isLoading}>
            Cancel
          </Button>
          <Button small onClick={handleCropImage} disabled={pictureMutation.isLoading}>
            Crop & Update
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CropEasy
