import ArticleDetail from './pages/articleDetail/ArticleDetail'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import { Toaster } from 'react-hot-toast'
import { Login } from './pages/login'
import { UserProfile } from './pages/userProfile'
import NotFound from './pages/notFound/NotFound'
import AdminLayout from './pages/admin/AdminLayout'
import Comments from './pages/admin/screen/comments/Comments'
import Admin from './pages/admin/screen/dashboard/Admin'
import ManagePost from './pages/admin/screen/post/ManagePost'
import EditPost from './pages/admin/screen/post/EditPost'
import ManageCategories from './pages/admin/screen/categories/ManageCategories'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPass/ResetPassword'
import EditCategory from './pages/admin/screen/categories/EditCategory'
import ManageUsers from './pages/admin/screen/users/ManageUsers'
import BLogPage from './pages/blog/BLogPage'
function App() {
  return (
    <div className="font-opensans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BLogPage />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePost />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="categories/manage" element={<ManageCategories />} />
          <Route path="categories/manage/edit/:categoryId" element={<EditCategory />} />
          <Route path="users/manage" element={<ManageUsers />} />
        </Route>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
