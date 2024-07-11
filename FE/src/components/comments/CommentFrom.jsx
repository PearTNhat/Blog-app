import { useState } from 'react'
import Button from '../Button'

function CommentFrom({ btnLabel, isLoading = false, intiValue = '', formSubmitHandler, formCancelHandler }) {
  const [value, setValue] = useState(() => intiValue)
  const submitHandler = (e) => {
    e.preventDefault()
    formSubmitHandler(value)
    setValue('')
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col border-[1.5px] border-primary border-opacity-60 rounded-md ">
        <textarea
          rows="3"
          value={value}
          placeholder="Leave your comment here..."
          className="resize-none focus:outline-none p-2 bg-transparent  w-full"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="ml-auto mr-[20px] mb-[20px] flex gap-4 max-[420px]:gap-2 max-[420px]:flex-col-reverse ">
          {formCancelHandler && (
            <Button type="button" cancel onClick={formCancelHandler}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {btnLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CommentFrom
