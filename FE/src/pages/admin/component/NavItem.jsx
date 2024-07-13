import { NavLink } from 'react-router-dom'

function NavItem({ link, Icon, title, name, setIsMenuOpen, isActiveNavName, setIsActiveNavName }) {
  return (
    <NavLink
      onClick={() => {
        if (window.innerWidth <= 768) {
          setIsMenuOpen(false)
        }
        setIsActiveNavName(name)
      }}
      to={link}
      className={`${isActiveNavName === name ? 'text-primary  font-bold' : 'text-dark-light'}
      flex items-center gap-2 mt-4`}
    >
      {<Icon />}
      {title}
    </NavLink>
  )
}

export default NavItem
