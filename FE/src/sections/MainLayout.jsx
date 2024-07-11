import Footer from "~/sections/Footer"
import Header from "~/sections/Header"

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
