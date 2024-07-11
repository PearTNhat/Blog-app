import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '~/components/Button'
import Input from '~/components/InputGroup/Input'
import InputGroup from '~/components/InputGroup/InputGroup'
import Label from '~/components/InputGroup/Label'
import MainLayout from '~/sections/MainLayout'
import { forgotPassword } from '~/services/user'
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  })
  const forgotMutation = useMutation({
    mutationFn: ({ email }) => {
      return forgotPassword({ email })
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const submitHandler = (data) => {
    forgotMutation.mutate(data)
  }
  console.log(forgotMutation.isLoading, 'isVAlid', isValid)
  return (
    <MainLayout>
      <section className="p-5 h-screen h-f-screen-header flex justify-center items-center">
        <div className="w-[361px]">
          <h1 className="text-4xl text-center font-bold mb-6">Forgot password</h1>
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
            <div className="my-4">
              <Button widthFull disabled={!isValid || forgotMutation.isLoading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}
export default ForgotPassword
