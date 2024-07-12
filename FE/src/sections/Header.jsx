import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'

import { Logo } from '~/assets/image'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Button from '~/components/Button'
import NavItem from '~/components/NavItem'
import { navLinks } from '~/constants'
import DropDownProfile from '~/components/DropDownProfile'
function Header() {
  const isSignUp = Boolean(useMatch('/register'))
  const userState = useSelector((state) => state.user.userInfo)
  const [navVisible, setNavVisible] = useState(false)
  const signInOrSignUp = isSignUp ? '/login' : '/register' // in Register page, we have a link to Login page, and vice versa
  const handleNavVisible = () => {
    setNavVisible(!navVisible)
  }
  return (
    <section className="fixed bg-white h-[56px] left-0 right-0 top-0 z-50">
      <header className="max-container mx-auto h-[var(--header-height)] w-full flex justify-between items-center">
        <div className=" w-16 ">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="md:hidden">
          {navVisible ? (
            <AiOutlineClose className="w-6 h-6" onClick={handleNavVisible} />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={handleNavVisible} />
          )}
        </div>
        <div
          className={`
          ${navVisible ? 'right-0  bg-dark-hard' : 'right-[-100%]'}
            max-md:w-full max-md:justify-center max-md:h-screen top-[56px]  
            max-md:absolute max-md:flex-col flex-row md:bg-transparent  
            flex gap-5 items-center transition-all duration-200`}
        >
          <ul className="md:bg-white flex max-md:flex-col flex-row gap-5 text font-semibold">
            {navLinks.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}

          </ul>
          {userState?.token ? (
            <DropDownProfile />
          ) : (
            <Button outline roundFull to={signInOrSignUp}>
              {signInOrSignUp === '/register' ? 'Sign up' : 'Sign in'}
            </Button>
          )}
        </div>
      </header>
    </section>
  )
}

export default Header
