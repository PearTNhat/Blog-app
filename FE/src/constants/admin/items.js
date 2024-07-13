import { TbDashboard } from 'react-icons/tb'
import { FaComments, FaUser } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
const navItems = [
  // {
  //   title: 'Dashboard',
  //   name: 'dashboard',
  //   icon: TbDashboard,
  //   link: '/admin',
  //   type: 'link'
  // },
  {
    title: 'Comments',
    name: 'comments',
    icon: FaComments,
    link: '/admin/comments',
    type: 'link'
  },
  {
    title: 'Users',
    name: 'users',
    icon: FaUser,
    link: '/admin/users/manage',
    type: 'link'
  },
  {
    title: 'Posts',
    name: 'posts',
    icon: MdDashboard,
    content: [
      {
        title: 'Categories',
        name: 'categories',
        link: '/admin/categories/manage/'
      },
      {
        title: 'Manage',
        name: 'manage',
        link: '/admin/posts/manage'
      },
      {
        title: 'Create',
        name: 'create',
        link: 'button'
      }
    ],
    type: 'collapse'
  }
]
export { navItems }
