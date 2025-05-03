import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { GalleryHorizontal } from "lucide-react";
import kids from "../assets/gallery1.jpg";
import training from "../assets/gallery2.jpg";
import competition from "../assets/gallery3.jpg";
import facilities from "../assets/gallery4.jpg";
import events from "../assets/gallery5.jpg";
import kid1 from "../assets/Program3.JPG";

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

        {/* Gallery Grid */}
        <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 no-scrollbar">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-0 flex-shrink-0 group relative overflow-hidden rounded-lg shadow-md cursor-pointer hover-scale"
              onClick={() => setExpandedImage(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-[250px] sm:h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <div className="flex items-center">
                    <GalleryHorizontal size={18} className="mr-2" />
                  </div>
                </div>
              </div>
              {/* Expanded Image Modal... (No Change) */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
