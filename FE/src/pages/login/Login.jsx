import { useMutation } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaEyeSlash } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import MainLayout from '~/sections/MainLayout'
import { signIn } from '~/services/user'
import { userActions } from '~/store/reducers/userReducer'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user.userInfo)
  const [showPassword, setShowPassword] = useState(false)
  // cai nay bi render 2 lan
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => {
      return signIn({ email, password })
    },
    onSuccess: (data) => {
      dispatch(userActions.userChange(data.data))
      localStorage.setItem('userInfo', JSON.stringify(data.data))
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  useEffect(() => {
    if (userState?.token) {
      navigate('/')
    }
  }, [userState?.token, navigate])
  const submitHandler = (data) => {
    loginMutation.mutate({ ...data })
  }
  return (
    <MainLayout>
      <section className="p-5 h-screen h-f-screen-header flex justify-center items-center">
        <div className="w-[361px]">
          <h1 className="text-4xl text-center font-bold mb-6">Sign in</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
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
            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                error={errors.password}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="Enter password"
                icon={
                  <i
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-[#666666] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </i>
                }
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </InputGroup>
            <div className="text-right">
              <Link to={'/forgot-password'} className="text-primary underline hover:text-blue-800 ">
                Forgot password
              </Link>
            </div>
            <div className="my-4">
              <Button widthFull disabled={!isValid && !loginMutation.isLoading} type="submit">
                {' '}
                Login
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default Login
