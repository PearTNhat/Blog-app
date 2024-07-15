import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query'
import InputGroup from '~/components/InputGroup/InputGroup'
import toast from 'react-hot-toast'
import { userActions } from '~/store/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import Label from '~/components/InputGroup/Label'
import Input from '~/components/InputGroup/Input'
import Button from '~/components/Button'
import MainLayout from '~/sections/MainLayout'
import { useEffect, useState } from 'react'
import { signUp } from '~/services/user'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user.userInfo)
  const [showPassword, setShowPassword] = useState(false)
  // cai nay bi render 2 lan
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signUp({ name, email, password })
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
  const password = watch('password')
  const submitHandler = (data) => {
    const { name, email, password } = data
    registerMutation.mutate({ name, email, password })
  }
  return (
    <MainLayout>
      <section className="p-5 h-screen h-f-screen-header flex justify-center items-center">
        <div className="w-[361px] ">
          <h1 className="text-4xl text-center font-bold mb-6">Sign up</h1>
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
            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => {
                    return value === password || 'The passwords do not match'
                  }
                })}
                placeholder="Enter confirmPassword"
                icon={
                  <i
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-[#666666] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </i>
                }
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </InputGroup>
            <div className="my-4">
              <Button widthFull disabled={!isValid || registerMutation.isLoading} type="submit">
                Register
              </Button>
            </div>
          </form>
          <div className="flex">
            <p className="text-dark-light text-sm mr-3 font-bold">You have an account?</p>
            <Link to="/login" className="text-primary text-sm font-bold">
              Login now
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Register
