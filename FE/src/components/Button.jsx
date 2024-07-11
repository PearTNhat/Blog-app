import { Link } from 'react-router-dom'

function Button({
  onClick,
  children,
  iconURL,
  icon,
  roundFull,
  outline,
  small,
  large,
  widthFull,
  fontSize,
  cancel,
  className,
  ...rest
}) {
  let Comp = 'button'
  if (rest?.href) {
    Comp = 'a'
  } else if (rest?.to) {
    Comp = Link
  }
  return (
    // default medium
    <Comp
      type="button"
      onClick={onClick}
      {...rest}
      className={`flex justify-center items-center leading-none 
    text-[#fff] border-2 border-primary bg-primary hover:bg-blue-700 transition-all duration-300 font-semibold
    py-[14px] px-[38px] w-auto rounded-md
    disabled:opacity-70 disabled:cursor-not-allowed
    ${cancel && '!text-red-500 !border-red-500 !bg-white hover:!bg-red-500 hover:!text-white'}
    ${fontSize}
    ${small && '!py-[10px] !px-[18px]'} 
    ${large && '!py-[20px] !px-[38px]'}
    ${widthFull && '!w-full'}
    ${roundFull && '!rounded-full'}
    ${outline && 'hover:!text-white hover:!bg-primary !text-primary !bg-white'}
    ${className}
    `}
    >
      <span>{children}</span>
      {iconURL && <img src={iconURL} alt="icon" />}
      {icon}
    </Comp>
  )
}

export default Button
