import { LogoFooter } from '~/assets/image'
import FooterCard from '~/components/FooterCard'
import { footerLink } from '~/constants'
import { FaFacebook, FaHeart } from 'react-icons/fa'
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
function Footer() {
  return (
    <section className="bg-dark-hard">
      <footer className="max-container grid grid-cols-12 justify-center max-lg:gap-6 max-md:justify-items-center">
        {footerLink.map((item, index) => (
          <ul key={index} className={`lg:col-span-2 md:col-span-4 ${index === 2 ? 'md:col-start-5' : ''} col-span-6 `}>
            <FooterCard item={item} />
          </ul>
        ))}
        <div className="lg:col-span-4  md:order-first md:col-span-4 col-span-12 max-md:mt-10">
          <img src={LogoFooter} className="max-md:mx-auto lg:mt-[1px]" alt="logo" />
          <p className="text-dark-light text-base max-md:text-center max-md:mt-2">
            Build a modern and creative website with crealand
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-12 mt-10 mb-4 max-md:hidden">
          <div className="flex items-center justify-center w-[56px] h-[56px] mx-auto bg-primary rounded-full">
            <FaHeart className="text-white w-[24px] h-[21px]" />
          </div>
          <p className="text-dark-light text-base italic mt-2 text-center">Copyright © 2019. Moonfo with love.</p>
        </div>
      </footer>
    </section>
  )
}

export default Footer
