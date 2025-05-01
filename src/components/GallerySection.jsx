import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { GalleryHorizontal } from "lucide-react";
import kids from "../assets/kids.png";
import training from "../assets/traning.png";
import competition from "../assets/sw1.jpg";
import facilities from "../assets/facilities.png";
import events from "../assets/Event.jpg";
import kid1 from "../assets/kid1.png";

const galleryItems = [
  {
    id: 1,
    image: training,
    category: "កំពុងហ្វឹកហាត់",
    title: "Training",
  },
  {
    id: 2,
    image: competition,
    category: "ការប្រកួត",
    title: "Competition",
  },
  {
    id: 3,
    image: kids,
    category: "កុមារ",
    title: "kids",
  },
  {
    id: 4,
    image: facilities,
    category: "គ្រឿងបរិក្ខារ",
    title: "Facilities",
  },
  {
    id: 5,
    image: events,
    category: "កម្មវិធី",
    title: "Events",
  },
  {
    id: 6,
    image: kid1,
    category: "កុមារ",
    title: "kids",
  },
];

const GallerySection = () => {
  const [filter, setFilter] = useState("ទាំងអស់");
  const [expandedImage, setExpandedImage] = useState(null);

  const categories = [
    "ទាំងអស់",
    "កំពុងហ្វឹកហាត់",
    "ការប្រកួត",
    "កុមារ",
    "គ្រឿងបរិក្ខារ",
    "កម្មវិធី",
  ];

  const filteredItems =
    filter === "ទាំងអស់"
      ? galleryItems
      : galleryItems.filter((item) => item.category.toLowerCase() === filter);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text​ text-head text-aqua-500">
            កម្រងរូបភាព
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-body">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full capitalize transition-all ${
                filter === category
                  ? "bg-aqua-500 text-white"
                  : "bg-white text-gray-700 hover:bg-aqua-100"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer hover-scale"
              onClick={() => setExpandedImage(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <div className="flex items-center">
                    <GalleryHorizontal size={18} className="mr-2" />
                    <span className="text-sm font-medium tracking-wider uppercase text-body">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                </div>
              </div>

              {expandedImage === item.id && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImage(null);
                  }}
                >
                  <div className="relative max-w-4xl max-h-[90vh]">
                    <button
                      className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                      onClick={() => setExpandedImage(null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                    <div className="mt-4 text-white text-center">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-sm opacity-80">{item.category}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-white">
          <Button asChild className="bg-navy-700 hover text-white​ text-body">
            <Link to="/gallery">មើលទាំងអស់</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
