import { useState } from "react";
import teacher1 from "../assets/teacher1.jpg";
import teacher2 from "../assets/teacher4.jpg";
import teacher3 from "../assets/teacher3.jpg";
import teacher4 from "../assets/teacher2.jpg";

const testimonials = [
  {
    id: 1,
    name: "នាង​ សូរិទ្ធិយ៉ា ",
    role: "Parent of 2 swimmers",
    image: teacher1,
    quote:
      "AquaElite transformed my children's swimming abilities. The instructors are patient, knowledgeable, and genuinely care about each child's progress. My kids look forward to their lessons every week!",
    rating: 5,
  },
  {
    id: 2,
    name: "ភិន​ រដ្ឋា​ ",
    role: "Adult learner",
    image: teacher2,
    quote:
      "I finally learned to swim at age 40! The adult beginner program was perfect for me. No judgment, just supportive instruction that built my confidence in the water step by step.",
    rating: 5,
  },
  {
    id: 3,
    name: "អ៊ូន​ ម៉ានីត​ ",
    role: "Competitive swimmer",
    image: teacher3,
    quote:
      "The competitive training program helped me qualify for nationals. The coaches focus on technique, endurance, and mental preparation. The facilities are top-notch too!",
    rating: 5,
  },
  {
    id: 4,
    name: "ចេង​ សុផា​ ",
    role: "Parent",
    image: teacher4,
    rating: 5,
  },
];

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

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [info, setInfo] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const toggleInfo = (buttonId, messageArray) => {
    setActiveButton((prev) => {
      if (prev === buttonId) {
        setInfo([]);
        return null;
      } else {
        setInfo(messageArray);
        return buttonId;
      }
    });
  };

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
        <div className="flex flex-col items-center mb-8">
          <div
            className="p-6 max-w-md w-full hover-scale transition-all"
            onClick={() => setActiveIndex(0)}
          >
            <div className="flex justify-center mb-4">
              <img
                src={topTestimonial.image}
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
                onClick={() =>
                  toggleInfo(1, [
                    "២០១៨ - បច្ចុប្បន្ន : មន្ត្រីបច្ចេកទេសកីឡាហែលទឹកអន្តរជាតិ តំណាងកម្ពុជា​",
                    "២០២៤ : បានចូលរួមកាត់សេចក្តីការប្រកួតកីឡាហែលទឹក យុវជន អាស៊ីអាគ្នេយ៏ លើកទី៤៦ នៅប្រទេសថៃ",
                    "២០២៣ : បានចូលរួមកាត់សេចក្តីការប្រកួតហែលទឹក យុវជនពីភពលោក នៅប្រទេស អីស្រាអែល",
                    "២០២៣ : បានចូលរួមកាត់សេចក្តី កីឡាស៊ីហ្គេម (ហែលទឹក) លើកទី៣២ នៅប្រទេសកម្ពុជា",
                    "២០២២ : បានចូលរួមកាត់សេចក្តីកីឡាហែលទឹកជនពិការ លើកទី១១ ប្រទេសឥណ្ឌូនេស៊ី",
                    "២០២២ : បានចូលរួមកាត់សេចក្តី ការប្រកួតកីឡាហែលទឹក យុវជន អាស៊ីអាគ្នេយ៏ លើកទី៤៤ ប្រទេសម៉ាឡេស៊ី",
                    "២០២១ : បានចូលរួមកាត់សេចក្តី កីឡាស៊ីហ្គេម (ហែលទឹក) លើកទី៣១ ប្រទេសវៀតណាម",
                    "២០១៩ : បានចូលរួមកាត់សេចក្តី កីឡាស៊ីហ្គេម (ហែលទឹក) លើកទី៣០ ប្រទេសហ្វីលីពីន",
                    "២០១៩ : បានចូលរួមកាត់សេចក្តី ការប្រកួតហែលទឹក យុវជនអាស៊ីអាគ្នេយ៏ លើកទី៤៣ ប្រទេសកម្ពុជា",
                    "២០១៨: បានចូលរូមសិក្សាវគ្គមន្រ្តីបច្ចេកទេសអន្តរជាតិ លើកទី១៣ ប្រទេសហុងគ្រី",
                    "២០១៧ : បានចូលរួមសិក្សាវគ្គមន្រ្តីបច្ចេកទេសកីឡាហែលទឹកនិងបានប្រឡងជាប់ជាមន្រ្តីបច្ចេកទេសអន្តរជាតិនៅប្រទេសថៃ",
                  ])
                }
              >
                បទពិសោធន៍​មន្ត្រី​បច្ចេកទេស​អន្តរជាតិ
              </button>
            )}

            {activeButton !== 1 && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-body3 overflow-hidden "
                onClick={() =>
                  toggleInfo(2, [
                    "ឆ្នាំ២០១០ - បច្ចុប្បន្ន ជាប់ជាគ្រូបង្វឹកកីឡាហែលទឹកជម្រើសជាតិកម្ពុជា",
                    "ឆ្នាំ២០១៤ ចូលរួមកម្មវិធីហ្វឹកហាត់បោះជំរុំ យុវជនអាស៊ី នៅប្រទេសកាតា",
                    "ឆ្នាំ២០១៥ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាសិស្សអាស៊ីអាគ្នេយ៍ នៅប្រទេសសឹង្ហបុរី",
                    "ឆ្នាំ២០១៦ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាហែលទឹកពិភពលោក នៅប្រទេសកាណាដា",
                    "ឆ្នាំ២០១៧ ចូលរួមកម្មវិធីហ្វឹកហាត់បោះជំរុំ យុវជនអាស៊ី នៅប្រទេសចិន",
                    "ឆ្នាំ២០១៨ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡានិស្សិតអាស៊ីអាគ្នេយ៍ នៅប្រទេសមីយ៉ាន់ម៉ា",
                    "ឆ្នាំ២០១៨ ចូលរួមកម្មវិធីហ្វឹកហាត់បោះជំរុំ និងដំណើរទស្សនកិច្ចនៅប្រទេសជប៉ុន",
                    "ឆ្នាំ២០១៩ ចូលរួមកម្មវិធីហ្វឹកហាត់បោះជំរុំ យុវជនអាស៊ីនៅប្រទេសកាតា",
                    "ឆ្នាំ២០១៩ ការដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាសិស្សអាស៊ីអាគ្នេយ៍ នៅប្រទេសឥណ្ឌូនឹស៊ី",
                    "ឆ្នាំ២០២១ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាហែលទឹកពិភពលោក នៅប្រទេសឌូបៃ",
                    "ឆ្នាំ២០២២ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាហែលទឹកពិភពលោក នៅប្រទេសហុងគ្រី",
                    "ឆ្នាំ២០២៣ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាទឹកពិភពលោក នៅប្រទេសកាតា",
                    "ឆ្នាំ២០២៤ ការដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមការប្រកួតកីឡាសិស្សអាស៊ីអាគ្នេយ៍ ប្រទេសវៀតណាម",
                    "ឆ្នាំ២០២៤ ដឹកនាំក្រុមកីឡាករ កីឡាការិនីចូលរួមប្រកួតការកីឡាទឹកពិភពលោក នៅប្រទេសហុងគ្រី",
                  ])
                }
              >
                បទពិសោធន៍​ដឹក​នាំ​ក្រុម​ប្រកួត​អន្តរជាតិ
              </button>
            )}
          </div>

          {/* Show Info */}
          {info.length > 0 && (
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
                  src={testimonial.image}
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
