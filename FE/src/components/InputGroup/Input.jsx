import { forwardRef } from 'react'
const Input = forwardRef(({ error, icon, ...rest }, ref) => {
  return (
    <div className={`${icon && 'relative'}`}>
      <input
        className={`${
          error && 'border-red-500'
        } placeholder:text-dark-light my-2 border-[1px] border-text-dark-gray rounded-md p-2 w-full outline-none focus:border-primary`}
        ref={ref}
        {...rest}
      />
      {icon}
    </div>
  )
})

export default Input
