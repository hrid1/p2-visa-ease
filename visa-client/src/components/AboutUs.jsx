import { Slide } from "react-awesome-reveal";
import aboutPic from "../assets/aboutus.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="text-center pb-4 mt-10">
        <h1 className="text-center text-4xl font-bold mb-2">About Us</h1>
        <p className="text-gray-600">
          We are Dedicated to best of Our Services
        </p>
      </div>

      <section className="flex flex-col md:flex-row justify-center items-center gap-6 w-11/12 mx-auto lg:gap-8 my-6 md:my-12">
        {/* Content Section */}

        <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-4 lg:gap-8">
        <Slide>
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:w-2/3">
    We are Dedicated to the Best of Our Services
  </h2>
  <p className="text-sm md:text-base leading-relaxed">
    Welcome to our passport and visa assistance platform. Our goal is to make 
    your travel documentation process smooth and hassle-free. From applying 
    for a new passport to securing a visa for your next destination, we are here 
    to guide you every step of the way.
    <br />
    <br />
    Discover comprehensive support, expert advice, and tailored services to 
    meet your specific needs. Let us help you simplify the complexities of 
    international travel. Join us today and embark on your journey with confidence!
  </p>
  <button className="btn bg-emerald-500 text-white hover:bg-emerald-600 transition-all">
    Learn More
  </button>
</Slide>

        </div>

        {/* Image Section */}

        <div className="w-full md:w-1/2 border rounded-xl overflow-hidden">
          <Slide direction="right">
            <img
              className="w-full h-full max-h-[300px] md:max-h-none object-cover"
              src={aboutPic}
              alt="About Us"
            />
          </Slide>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
