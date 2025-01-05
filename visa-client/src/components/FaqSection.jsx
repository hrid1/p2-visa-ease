import { Fade, Slide } from "react-awesome-reveal";
import faqimg from "../assets/faq.png";

const FaqSection = () => {
  return (
    <div className="my-6">
      <h2 className="text-xl md:text-4xl font-bold  text-center my-4">
        Frequently Asked Questions
      </h2>

      <section className="flex flex-col md:flex-row items-center justify-center gap-8 b">
        {/* img */}

        <div className="w-full md:w-1/2 p-2  rounded-md">
          <Slide direction="right" className="w-full md:w-9/12 mx-auto ">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={faqimg}
              alt=""
            />
          </Slide>
        </div>

        {/* FAQ */}
        <div className="space-y-4 w-full md:w-1/2  mr-0 md:mr-8">
          <Slide>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How to Apply for a Passport?
              </div>
              <div className="collapse-content">
                <p>
                  To apply for a passport, complete the online application form,
                  upload required documents, and schedule an appointment at your
                  nearest passport office. Ensure you bring proof of identity,
                  citizenship, and recent photographs.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                What Documents Are Required for a Visa?
              </div>
              <div className="collapse-content">
                <p>
                  The documents required for a visa typically include a valid
                  passport, visa application form, recent passport-size photos,
                  travel itinerary, and financial proof. Additional documents
                  might be needed based on the type of visa and destination.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                How Long Does Visa Processing Take?
              </div>
              <div className="collapse-content">
                <p>
                  Visa processing times vary depending on the country and type
                  of visa. On average, it can take 7 to 15 business days.
                  However, some visas, such as urgent or expedited visas, can be
                  processed within 1-3 days.
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
