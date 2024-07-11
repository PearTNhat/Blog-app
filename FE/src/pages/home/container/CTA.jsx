import { CTAImage } from "~/assets/image"
import Button from "~/components/Button"

function CTA() {
  return (
    <>
      <svg className="w-full translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Wave" fillRule="evenodd" clipRule="evenodd" d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z" fill="#0D2436" />
      </svg>
      <section className="bg-dark-hard p-4">
        <div className="max-container flex gap-10 lg:flex-row md:flex-col-reverse items-center pb-10 font-roboto ">
          <div className="flex-1">
            <p className="font-bold text-xl md:text-4xl my-7 text-white">Get our stories delivered From us to your inbox weekly.</p>
            <div className="flex md:flex-row flex-col items-center whitespace-nowrap">
              <input type="text" className="placeholder:text-md placeholder:font-light outline-none w-full md:p-4 p-3 rounded-md" placeholder="Your Email" />
              <div className="max-md:mt-2 md:ml-3 max-md:w-full">
                <Button widthFull large>Get started</Button>
              </div>
            </div>
            <p className="text-dark-light text-md mt-4 ">
              <span className="text-[#B3BAC5] font-bold">Get a response tomorrow </span>
              if you submit by 9pm today. If we received after 9pm will get a reponse the following day.
            </p>
          </div>
          <div className="flex-1 max-md:hidden ">
            <div className="relative w-3/4 mx-auto">
              <div className="w-1/2 h-1/2  rounded-xl bg-[#FC5A5A] opacity-70 absolute -right-[8%] -top-[9%] "></div>
              <div className="w-1/2 h-1/2  rounded-xl bg-[#E5EAF4] opacity-10 absolute -bottom-[8%] -left-[8%] "></div>
              <div className="relative z-10  flex-1 bg-white p-3 rounded-xl z-3" >
                <img src={CTAImage} alt="title" className="w-full" />
                <div className="p-4 relative z-2">
                  <h2 className="font-roboto text-2xl font-bold mt-4">Future of Work</h2>
                  <p className="text-lg my-4 text-dark-light leading-8">Our insurance plans offers are priced the same everywhere else.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CTA
