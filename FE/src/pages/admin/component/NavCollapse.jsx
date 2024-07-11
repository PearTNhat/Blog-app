import { useState } from 'react'
import { GoChevronUp } from 'react-icons/go'
import { LuChevronDown } from 'react-icons/lu'
import { Link } from 'react-router-dom'
function NavCollapse({ title, Icon, content, name, isActiveNavName, setIsActiveNavName, handleCreatePost }) {
  const [isCollapse, setIsCollapse] = useState(false)
  const toggleCollapseHandler = () => {
    setIsCollapse(!isCollapse)
  }
  return (
    <div>
      <div
        className="flex justify-between cursor-pointer mt-3 bg-white"
        onClick={() => {
          setIsActiveNavName(name)
          toggleCollapseHandler()
        }}
      >
        <span
          className={`${
            isActiveNavName === name ? 'text-primary font-bold' : 'text-dark-light'
          } flex justify-between items-center gap-2`}
        >
          {<Icon />}
          {title}
        </span>
        {isCollapse ? <GoChevronUp /> : <LuChevronDown />}
      </div>
      <div className="bg-white pl-4">
        {isCollapse &&
          content.map((item) => (
            <div key={item.name}>
              {item.link === 'button' ? (
                <button
                  className="hover:bg-blue-100 w-full text-left rounded-lg mt-1 px-2 py-1"
                  onClick={handleCreatePost}
                >
                  {item.title}
                </button>
              ) : (
                <Link className="hover:bg-blue-100 w-full block rounded-lg mt-1 px-2 py-1" to={item.link}>
                  {item.title}
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default NavCollapse
