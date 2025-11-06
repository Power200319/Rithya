import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [info, setInfo] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [experienceTestimonials, setExperienceTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/testimonials/');
        if (response.ok) {
          const data = await response.json();
          // Separate basic testimonials and experience testimonials
          const basicTestimonials = data.filter(testimonial => testimonial.experience === 1);
          const experienceData = data.filter(testimonial => testimonial.experience === 2 || testimonial.experience === 3);
          setTestimonials(basicTestimonials);
          setExperienceTestimonials(experienceData);
        }
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const topTestimonial = testimonials.length > 0 ? testimonials[0] : null;
  const bottomTestimonials = testimonials.slice(1);

  const toggleInfo = (buttonId, experienceType) => {
    setActiveButton((prev) => {
      if (prev === buttonId) {
        setInfo([]);
        return null;
      } else {
        // Find the experience testimonial data based on type
        const experienceData = experienceTestimonials.find(t => t.experience === experienceType);

        if (experienceData && experienceData.experience_details) {
          // Ensure experience_details is an array
          const details = Array.isArray(experienceData.experience_details)
            ? experienceData.experience_details
            : [experienceData.experience_details];
          console.log('Setting info to database data:', details);
          setInfo(details);
        } else {
          console.log('No experience data found in database for type:', experienceType);
          // Don't show any fallback data - only show data that exists in database
          setInfo([]);
        }
        return buttonId;
      }
    });
  };

  const colors = [
    "bg-gray-200 rounded-t-lg",
    "bg-white",
    "bg-gray-200",
    "bg-white",
    "bg-gray-200",
    "bg-white",
    "bg-gray-200",
    "bg-white",
    "bg-gray-200",
    "bg-white",
    "bg-gray-200",
    "bg-white",
    "bg-gray-200",
    "bg-white rounded-b-lg",
  ];

  return (
    <section className="section-padding bg-aqua-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text text-head text-aqua-500">
            គ្រូបង្រៀន
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading testimonials...</p>
          </div>
        ) : topTestimonial ? (
          <>
            {/* Top Card */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="p-6 max-w-md w-full hover-scale transition-all"
                onClick={() => setActiveIndex(0)}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={topTestimonial.image_url || topTestimonial.image}
                    alt={topTestimonial.name}
                    className="hover:scale-115 transition-transform duration-300 object-contain rounded-full w-35 h-35 border-4 border-white shadow-lg"
                  />
                </div>
                <p className="font-semibold text-navy-800 text-center text-head mt-7">
                  {topTestimonial.name}
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-1 max-w-md w-full">
                {activeButton !== 2 && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-body3 overflow-hidden "
                    onClick={() => toggleInfo(1, 2)}
                  >
                    បទពិសោធន៍​មន្ត្រី​បច្ចេកទេស​អន្តរជាតិ
                  </button>
                )}

                {activeButton !== 1 && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-body3 overflow-hidden "
                    onClick={() => toggleInfo(2, 3)}
                  >
                    បទពិសោធន៍​ដឹក​នាំ​ក្រុម​ប្រកួត​អន្តរជាតិ
                  </button>
                )}
              </div>

              {/* Show Info */}
              {info && info.length > 0 && (
                <ul className="mt-4 font-medium text-justify rounded-2xl text-gray-800 list-disc list-inside max-w-md w-full shadow">
                  {info.map((item, index) => {
                    const colorClass = colors[index % colors.length];
                    return (
                      <li key={index} className={`${colorClass} p-1 text-body3`}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Bottom Cards */}
            <div className="flex md:grid overflow-x-auto gap-6 md:grid-cols-3 pb-4 -mx-4 px-4 no-scrollbar">
              {bottomTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`min-w-[250px] md:min-w-0 flex-shrink-0 p-6 hover-scale transition-all duration-300 ${
                    activeIndex === index + 1
                      ? "border-aqua-500 shadow-lg bg-white"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(index + 1)}
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={testimonial.image_url || testimonial.image}
                      alt={testimonial.name}
                      className="hover:scale-115 transition-transform duration-300 object-contain rounded-full w-32 h-32 border-4 border-white shadow-lg"
                    />
                  </div>
                  <p className="font-semibold text-navy-800 text-center text-head mt-7">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available</p>
          </div>
        )}
      </div>
    </section>
  );
}
export default TestimonialsSection;
