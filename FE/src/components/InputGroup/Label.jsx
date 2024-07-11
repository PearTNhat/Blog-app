function Label({ children, className, ...rest }) {
  // className = className
  //   .split(' ')
  //   .map((c) => '!' + c)
  //   .join(' ')
  return (
    <label className={`text-dark-light text-base font-bold ${className}`} {...rest}>
      {children}
    </label>
  )
}

export default Label
