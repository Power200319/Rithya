import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "../components/ui/card";
import basic from "../assets/basic.jpg";
import advaned from "../assets/advaned.png";
import intermediate from "../assets/intermedia.png";
import highest from "../assets/hight.png";

const programs = [
  {
    id: "kids-beginners",
    title: "វគ្គកម្រិតមូលដ្ឋាន",
    level: "Basic",
    description: [
      "ការកសាងទំនុកចិត្តនិងភាពក្លាហានក្នុងទឹក",
      "ការបណ្តែតខ្លួនលើផ្ទៃទឹកដោយគ្មានជំនួយ",
      "ការដកដង្ហើមយ៉ាងប្រសិទ្ធភាព",
      "បច្ចេកទេសគោះជើងក្នុងរបៀបសេរី",
      "បច្ចេកទេសចលនាដៃក្នុងរបៀបហែលសេរី",
      "ការហែលទឹករបៀបសេរីចម្ងាយ ២៥ ម៉ែត្រ",
    ],
    image: basic,
  },
  {
    id: "intermediate-swimmers",
    title: "វគ្គកម្រិតមធ្យម",
    level: "Intermediate",
    description: [
      "បន្តពីរកម្រិតមូលដ្ឋាន ១ របៀបហែលសេរី",
      "អភិវឌ្ឍន៍អារម្មណ៍ លោតទឹកជ្រៅ",
      "គោះជើងបច្ចេកទេសហែលសេរី និងផ្ងារ",
      "បច្ចេកទេសចលនាដៃហែលសេរី និងផ្ងារ",
      "បច្ចេកទេសលាតចេញតំណើរ ហែលសេរី",
      "កំណត់របៀបហែលឲ្យបានត្រឹមត្រូវ៥០ម",
    ],
    image: intermediate,
  },
  {
    id: "competitive-training",
    title: "វគ្គកម្រិតខ្ពស់",
    level: "Advanced",
    description: [
      "បន្តពីរកម្រិតមធ្យម ២ របៀបហែលផ្ងារ",
      "អភិវឌ្ឍន៏កម្លាំងកាយ អំណត់ និងល្បឿន",
      "គោះជើងបច្ចេកទេសហែលកង្កែប",
      "បច្ចេកទេសចលនាដៃហែលកង្កែប",
      "គោះជើងបច្ចេកទេសហែលមេអំបៅ",
      "របៀបហែលសេរី ផ្ងារ និងកង្កែប",
    ],
    image: advaned,
  },
  {
    id: "adult-beginners",
    title: "វគ្គកម្រិតខ្ពស់បំផុត",
    level: "Highest",
    description: [
      "បង្កើនបន្ទុកកម្លាំងការហ្វឹកហាត់កម្លាំងកាយ",
      "បង្កើនកម្រិតជំនាញ របៀបហែលនីមួយៗ",
      "បង្កើនបទពិសោធន៍ បច្ចេកទេស និងប្រកួត",
      "បច្ចេកទេសពិសេស (លោត ត្រលប់ ដល់ទី)",
      "កំណត់ថេរៈវេលា ជំនាញរបៀបហែល",
      "កំណត់គោលដៅ នៃការប្រកួត",
    ],
    image: highest,
  },
];

const ProgramsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "ទាំងអស់" },
    { id: "Basic", label: "វគ្គកម្រិតមូលដ្ឋាន" },
    { id: "Intermediate", label: "វគ្គកម្រិតមធ្យម" },
    { id: "Advanced", label: "វគ្គកម្រិតខ្ពស់" },
    { id: "Highest", label: "វគ្គកម្រិតខ្ពស់បំផុត" },
  ];

  const filteredPrograms =
    activeFilter === "all"
      ? programs
      : programs.filter(
          (program) =>
            program.level.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section id="programs" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-head text-aqua-500 md:text-3xl mb-4 gradient-text ">
            កម្មវិធីបណ្តុះបណ្តាលហែលទឹក
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
          {/* <p className="text-gray-700 max-w-3xl mx-auto">
            Discover our range of swimming programs designed for all ages and
            skill levels. From beginners taking their first strokes to advanced
            swimmers refining their technique, we have the perfect program for
            everyone.
          </p> */}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? "bg-aqua-500 text-white"
                  : "bg-white text-gray-700​ text-body hover:bg-aqua-100​ "
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrograms.map((program) => (
            <Card
              key={program.id}
              className="overflow-hidden hover-scale card-shadow border-none"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-navy-800 text-body">
                    {program.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      program.level === "Basic"
                        ? "bg-green-100 text-green-800"
                        : program.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : program.level === "Advanced"
                        ? "bg-blue-100 text-blue-800"
                        : program.level === "Highest"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {program.level}
                  </span>
                </div>

                {/* Description: List or Paragraph */}
                {Array.isArray(program.description) ? (
                  <ul className="text-gray-700 text-sm space-y-2 mb-6 list-disc list-inside text-title">
                    {program.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 mb-6 text-sm line-clamp-3">
                    {program.description}
                  </p>
                )}

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-aqua-500 text-aqua-600 card text-body"
                >
                  <Link to={`/programs/${program.id}`}>មើលបន្ថែម</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 text-white">
          <Button asChild className="bg-navy-700 hover px-8​ text-body">
            <Link to="/programs">មើលទាំងអស់</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
