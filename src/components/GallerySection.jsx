import { useState } from "react";
import { GalleryHorizontal } from "lucide-react";
import kids from "../assets/gallery1.jpg";
import training from "../assets/gallery2.jpg";
import competition from "../assets/gallery3.jpg";
import facilities from "../assets/gallery4.jpg";
import events from "../assets/gallery5.jpg";
import kid1 from "../assets/Program3.JPG";

// Gallery Data
const galleryItems = [
  { id: 1, image: training, category: "កំពុងហ្វឹកហាត់", title: "Training" },
  { id: 2, image: competition, category: "ការប្រកួត", title: "Competition" },
  { id: 3, image: kids, category: "កុមារ", title: "Kids" },
  { id: 4, image: facilities, category: "គ្រឿងបរិក្ខារ", title: "Facilities" },
  { id: 5, image: events, category: "កម្មវិធី", title: "Events" },
  { id: 6, image: kid1, category: "កុមារ", title: "Kids" },
];

// Filter Options
const categories = [
  "ទាំងអស់",
  "កំពុងហ្វឹកហាត់",
  "ការប្រកួត",
  "កុមារ",
  "គ្រឿងបរិក្ខារ",
  "កម្មវិធី",
];

const GallerySection = () => {
  const [filter, setFilter] = useState("ទាំងអស់");

  const filteredItems =
    filter === "ទាំងអស់"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container mx-auto max-w-screen-lg px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-head text-aqua-500 mb-4">
            កម្រងរូបភាព
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-4"></div>
        </div>

        {/* Gallery Grid */}
        <div className="flex md:grid overflow-x-auto gap-6 md:grid-cols-3 pb-4 -mx-4 px-4 no-scrollbar">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] md:min-w-0 flex-shrink-0 rounded-full bg-gray-50 hover-scale transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className=" h-64 lg:w-full bg-white shadow-md rounded-xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 w-full p-4 text-white flex items-center">
                  <GalleryHorizontal size={18} className="mr-2" />
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
