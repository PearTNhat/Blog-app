import { Outlet, useNavigate } from 'react-router-dom'
import Header from './component/Header'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '~/services/user'
import toast from 'react-hot-toast'
function AdminLayout() {
  const navigate = useNavigate()
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfile(),
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate('/')
        toast.error('You are not admin')
      }
    },
    onError: () => {
      navigate('/')
      toast.error('You are not admin')
    }
  })
  if (profileQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="block text-2xl text-slate-300">Loading...</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col md:flex-row">
      <Header />
      <main className="md:flex-1 bg-[#F9F9F9] h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
