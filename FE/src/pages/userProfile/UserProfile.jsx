import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import ProfilePicture from '~/components/ProfilePicture'
import MainLayout from '~/sections/MainLayout'
import { getUserProfile, updateProfile } from '~/services/user'
import { userActions } from '~/store/reducers/userReducer'

function UserProfile() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user.userInfo)

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfile()
  })
  const profileMutation = useMutation({
    mutationFn: ({ token, name, email }) => updateProfile({ token, name, email }),
    onSuccess: (data) => {
      dispatch(userActions.userChange(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
      queryClient.invalidateQueries(['profile'])
      toast.success('Update profile successfully')
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      avatar: '',
      name: '',
      email: ''
    },
    values: useMemo(() => {
      return {
        avatar: profileQuery.isLoading ? '' : profileQuery.data?.avatar,
        name: profileQuery.isLoading ? '' : profileQuery.data?.name,
        email: profileQuery.isLoading ? '' : profileQuery.data?.email
      }
    }, [profileQuery.isLoading, profileQuery.data?.avatar, profileQuery.data?.name, profileQuery.data?.email]),
    mode: 'onChange'
  })
  useEffect(() => {
    if (!userState?.token) {
      navigate('/')
    }
  }, [userState?.token, navigate])

  const submitHandler = (data) => {
    const { name, email } = data
    const token = userState?.token
    profileMutation.mutate({ token, name, email })
  }
  return (
    <MainLayout>
      <section className="p-5 h-screen h-f-screen-header flex justify-center items-center">
        <div className="w-[361px] ">
          <ProfilePicture avatar={userState?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                error={errors.name}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 1,
                    message: 'Name must be at least 1 characters'
                  }
                })}
                ref={register('name').ref}
                placeholder="Enter name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                error={errors.email}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email'
                  }
                })}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </InputGroup>
            <div className="my-4">
              <Button widthFull disabled={!isValid || profileMutation.isLoading} type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default UserProfile
