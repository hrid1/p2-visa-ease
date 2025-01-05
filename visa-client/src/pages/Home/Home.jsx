import AboutUs from "../../components/AboutUs";
import Banner from "../../components/Banner";
import FaqSection from "../../components/FaqSection";
import LatestVisas from "../../components/LatestVisas";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestVisas />
      <AboutUs />
      <FaqSection />
    </div>
  );
};

export default Home;
