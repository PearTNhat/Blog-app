import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaEyeSlash } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import MainLayout from '~/sections/MainLayout'
import { resetPassword } from '~/services/user'

function ResetPassword() {
  const { id, token } = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })
  const resetMutation = useMutation({
    mutationFn: ({ id, token, password, confirmPassword }) => {
      return resetPassword({ id, token, password, confirmPassword })
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const submitHandler = (data) => {
    resetMutation.mutate({ id, token, ...data })
  }

  const password = watch('password')
  return (
    <MainLayout>
      <section className="p-5 h-screen h-f-screen-header flex justify-center items-center">
        <div className="w-[361px]">
          <h1 className="text-4xl text-center font-bold mb-6">Reset password</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
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
                icon={
                  <i
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-[#666666] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </i>
                }
                placeholder="Enter new password"
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
              <Button widthFull disabled={resetMutation.isLoading || !isValid} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default ResetPassword
