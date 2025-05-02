import { useState } from "react";
import { Card } from "./ui/Card";
import teacher1 from "../assets/teacher1.jpg";
import teacher2 from "../assets/teacher2.jpg";
import teacher3 from "../assets/teacher3.jpg";
import teacher4 from "../assets/teacher4.jpg";

const testimonials = [
  {
    id: 1,
    name: "នាង​ សូរិទ្ធិយ៉ា ( Neang Sorithya )",
    role: "Parent of 2 swimmers",
    image: teacher4,
    quote:
      "AquaElite transformed my children's swimming abilities. The instructors are patient, knowledgeable, and genuinely care about each child's progress. My kids look forward to their lessons every week!",
    rating: 5,
  },
  {
    id: 2,
    name: "ភិន​ រដ្ឋា​ ( Phin Ratha )",
    role: "Adult learner",
    image: teacher2,
    quote:
      "I finally learned to swim at age 40! The adult beginner program was perfect for me. No judgment, just supportive instruction that built my confidence in the water step by step.",
    rating: 5,
  },
  {
    id: 3,
    name: "អ៊ូន​ ម៉ានីត​ ( Oun Manit )",
    role: "Competitive swimmer",
    image: teacher3,
    quote:
      "The competitive training program helped me qualify for nationals. The coaches focus on technique, endurance, and mental preparation. The facilities are top-notch too!",
    rating: 5,
  },
  {
    id: 4,
    name: "ចេង​ សុផា​ ( Cheng Pha )",
    role: "Parent",
    image: teacher1,
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Split the array
  const topTestimonial = testimonials[0];
  const bottomTestimonials = testimonials.slice(1);

  return (
    <section className="section-padding bg-aqua-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text text-head text-aqua-500">
            គ្រូបង្រៀន
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        {/* Top Card */}
        <div className="flex justify-center mb-8">
          <Card
            className="p-6 bg-white shadow-lg border-aqua-500 max-w-md w-full hover-scale transition-all"
            onClick={() => setActiveIndex(0)}
          >
            <div className="flex justify-center mb-4 ">
              <img
                src={topTestimonial.image}
                alt={topTestimonial.name}
                className=" hover:scale-115 transition-transform duration-300 object-contain rounded-full w-32 h-32 "
              />
            </div>
            <p className="font-semibold text-navy-800 text-center text-head mt-7">
              {topTestimonial.name}
            </p>
          </Card>
        </div>

        {/* Bottom 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomTestimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`p-6 bg-gray-50 hover-scale transition-all duration-300 ${
                activeIndex === index + 1
                  ? "border-aqua-500 shadow-lg bg-white"
                  : ""
              }`}
              onClick={() => setActiveIndex(index + 1)}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="hover:scale-115 transition-transform duration-300 object-contain rounded-full w-32 h-32"
                />
              </div>
              <p className="font-semibold text-navy-800 text-center text-head mt-7">
                {testimonial.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
