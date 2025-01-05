import { useEffect, useState } from "react";
import LatestVisaCard from "./LatestVisaCard";
import { Zoom } from "react-awesome-reveal";

const LatestVisas = () => {
  // const visas = ["a", "c", "b", "5"];

  const [visas, setVisas] = useState([]);
  useEffect(() => {
    fetch("https://visa-server-zeta.vercel.app/visas")
      .then((res) => res.json())
      .then((data) => setVisas(data));
  }, []);

  return (
    <section className="my-4 md:my-8 lg:my-12 px-4 md:px-8 ">
      <div>
        <h2 className="text-center font-bold my-4 md:my-8 text-xl md:text-4xl">
          Latest Visas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 ">
       <Zoom>
       {visas.slice(0, 6).map((visa, idx) => (
          <LatestVisaCard key={idx} visa={visa} />
        ))}
       </Zoom>
      </div>
    </section>
  );
};

export default LatestVisas;
