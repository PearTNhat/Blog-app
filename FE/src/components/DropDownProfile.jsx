import { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '~/store/actions/user'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { stables } from '~/constants/stables'
import { UserImg } from '~/assets/image'

function DropDownProfile() {
  const user = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  const handleShowDropdown = () => {
    if (window.innerWidth >= 768) return
    setShowDropdown((prev) => !prev)
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div>
      <div className="relative group flex flex-col items-center ">
        <div className=" flex items-center cursor-pointer" onClick={handleShowDropdown}>
          {/* <Button outline roundFull icon={<MdKeyboardArrowDown />}>
            Account
          </Button> */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-400">
            <img src={user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar : UserImg} alt={user?.name} />
          </div>
        </div>
        <div
          className={`${showDropdown ? 'block bg-dark-soft w-[100px] mt-3 py-2' : 'bg-white hidden'
            } min-w-[100px] md:group-hover:block rounded-lg md:shadow-lg md:absolute md:top-full max-lg:right-0 overflow-hidden`}
        >
          <ul className="max-md:text-white text-dark-soft my-1">
            {user?.admin && (
              <li className="hover:text-white hover:bg-dark-hard px-6 py-2">
                <Link to="/admin" className="text-center w-full block">
                  Admin
                </Link>
              </li>
            )}
            <li className="hover:text-white hover:bg-dark-hard px-6 py-2">
              <Link to="/profile" className="text-center w-full block">
                Profile
              </Link>
            </li>
            <li className="hover:text-white hover:bg-dark-hard px-6 py-2">
              <button className="text-center w-full block" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DropDownProfile
