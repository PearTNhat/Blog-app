import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Button from './Button'

function Search({ className, handleSubmit, search = '', isLoading = false, isFetching = false }) {
  const [searchKeyWord, setSearchKeyWord] = useState('')
  useEffect(() => {
    setSearchKeyWord(search)
  }, [])

  return (
    <form onSubmit={(e) => handleSubmit(e, searchKeyWord)}>
      <div
        className={`${className} flex flex-col items-center md:pr-2 md:flex-row md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:rounded-md overflow-hidden`}
      >
        <div className="relative flex w-full">
          <FiSearch className="text-dark-light absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className={`pl-7 placeholder:italic placeholder:text-dark-light
        text-dark-soft outline-none py-3 px-2 w-full max-md:border max-md:focus:border-primary max-md:rounded-md`}
            placeholder="Search article"
            value={searchKeyWord}
            onChange={(e) => setSearchKeyWord(e.target.value)}
          />
        </div>
        <div className="max-md:w-full max-md:mt-1">
          <Button small widthFull type="submit" disabled={isLoading || isFetching}>
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Search
