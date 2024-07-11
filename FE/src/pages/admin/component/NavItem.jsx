import { NavLink } from 'react-router-dom'

function NavItem({ link, Icon, title, name, isActiveNavName, setIsActiveNavName }) {
  return (
    <NavLink
      onClick={() => setIsActiveNavName(name)}
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
