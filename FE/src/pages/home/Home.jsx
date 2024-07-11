import MainLayout from '~/sections/MainLayout'
import Hero from './container/Hero'
import Articles from './container/Articles'
import CTA from './container/CTA'
// import { Logo } from "~/assets/image"
function Home() {
  return (
    <MainLayout className="">
      <Hero/>
      <Articles/>
      <CTA/>
    </MainLayout>
  )
}

export default Home
