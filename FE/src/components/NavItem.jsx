import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

function NavItem({ item }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const handleShowDropdown = () => {
    if (window.innerWidth >= 768) return
    setShowDropdown((prev) => !prev)
  }
  return (
    <li className="relative flex flex-col items-center w-sm max-md:text-white p-2 group text-dark-soft">
      {item.type === 'link' ? (
        <>
          <Link to={item.href} >{item.label} </Link>
          <span className="absolute right-0 cursor-pointer transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:right-[90%]">/</span>
        </>
      )
        :
        <div className="flex flex-col items-center">
          <button className=" flex items-center cursor-pointer" onClick={handleShowDropdown}>
            <span>{item.label}</span>
            <MdKeyboardArrowDown />
          </button>
          <div className={`${showDropdown ? "block bg-dark-soft w-[100px] mt-3 py-2" : "hidden"} md:group-hover:block md:left-[50%] md:translate-x-[-50%] rounded-lg md:shadow-lg md:absolute md:top-full  overflow-hidden`}>
            <ul className="max-md:text-white text-dark-soft bg-white py-1">
              {item.items.map((subItem) => (
                <li key={subItem.title} className="hover:text-white hover:bg-dark-hard px-4 py-1">
                  <Link to={subItem.href} className="text-left w-full block">{subItem.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </li >
  )
}

export default NavItem
