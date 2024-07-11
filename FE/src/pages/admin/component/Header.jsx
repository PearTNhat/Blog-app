import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Logo } from '~/assets/image'
import { navItems } from '~/constants/admin/items'
import NavItem from './NavItem'
import NavCollapse from './NavCollapse'
import useWindowSizeCustom from '~/hooks/useWindowSizeCustom'
import { createPost } from '~/services/post'
import { useSelector } from 'react-redux'

const activeNavName = {
  '/admin/posts/manage': 'posts',
  '/admin/comments': 'comments',
  '/admin': 'dashboard'
}

function Header() {
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user)
  const [isActiveNavName, setIsActiveNavName] = useState(activeNavName[location.pathname])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const createPostMutation = useMutation({
    mutationFn: ({ token }) => createPost({ token }),
    onSuccess: (data) => {
      toast.success('Create post successfully')
      queryClient.invalidateQueries('posts')
      navigate(`/admin/posts/manage/edit/${data.slug}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const handleCreatePost = () => {
    createPostMutation.mutate({ token: userState.userInfo.token })
  }
  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const { width } = useWindowSizeCustom()
  useEffect(() => {
    if (width > 768) {
      setIsMenuOpen(true)
    } else {
      setIsMenuOpen(false)
    }
  }, [width])
  return (
    <header className="max-container flex justify-between w-full md:w-auto md:p-0 select-none border">
      <Link to="/" className="md:hidden">
        <img src={Logo} alt="logo" className="w-16" />
      </Link>
      {/* Menu */}
      <div className="md:hidden">
        {isMenuOpen ? (
          <AiOutlineClose onClick={toggleMenuHandler} className="cursor-pointer text-2xl" />
        ) : (
          <AiOutlineMenu onClick={toggleMenuHandler} className="cursor-pointer text-2xl" />
        )}
      </div>
      {/* sidebar container */}
      {isMenuOpen && (
        <div className="fixed z-[999] inset-0 md:static lg:w-[300px] md:h-screen">
          {/* underlay */}
          <div className="fixed inset-0 bg-black opacity-[0.5] md:hidden" onClick={toggleMenuHandler}></div>
          {/* sidebar */}
          <div className="relative z-50 p-4 w-3/4 h-full bg-white md:static md:w-full">
            <Link to="/" className="block">
              <img src={Logo} alt="logo" className="w-16" />
            </Link>
            <h4 className="text-dark-light font-bold my-4">MENU ITEM</h4>
            {/* menu items */}
            <div className="">
              {navItems.map((item) =>
                item.type == 'link' ? (
                  <NavItem
                    key={item.name}
                    link={item.link}
                    name={item.name}
                    Icon={item.icon}
                    title={item.title}
                    isActiveNavName={isActiveNavName}
                    setIsActiveNavName={setIsActiveNavName}
                  />
                ) : (
                  <NavCollapse
                    key={item.name}
                    title={item.title}
                    name={item.name}
                    Icon={item.icon}
                    content={item.content}
                    isActiveNavName={isActiveNavName}
                    setIsActiveNavName={setIsActiveNavName}
                    handleCreatePost={handleCreatePost}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
