import { useNavigate } from 'react-router-dom';
import { HeroImg } from '~/assets/image'
import Search from '~/components/Search'

function Hero() {
  const navigate = useNavigate();
  const handleSubmit = (e, searchKeyWord) => {
    e.preventDefault()
    navigate(`/blog?search=${searchKeyWord}`)
  }
  return (
    <section className="">
      <div className="max-container p-4 mx-auto flex mt-20">
        <div className=" font-roboto mt-12 lg:w-[540px] flex-1">
          <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl text-dark-soft md:max-w-[540px]">
            {' '}
            Read the most interesting articles
          </h1>
          <p className="text-dark-light leading-8 sm:text-dark-soft my-6 md:max-w-[540px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua
          </p>
          <Search handleSubmit={handleSubmit} />
          <div className="flex lg:items-center max-sm:flex-col max-sm:items-start mt-4 ">
            <p className="pr-2 italic font-bold text-dark-light">Popular Tags:</p>
            <ul className="flex flex-wrap gap-2 ">
              <li className="bg-primary bg-opacity-10 text-primary rounded-md px-2 py-1">Design</li>
              <li className="bg-primary bg-opacity-10 text-primary rounded-md px-2 py-1">User Experience</li>
              <li className="bg-primary bg-opacity-10 text-primary rounded-md px-2 py-1">User Interfaces</li>
            </ul>
          </div>
        </div>
        <div className="max-md:hidden flex-1 self-center">
          <img src={HeroImg} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Hero
