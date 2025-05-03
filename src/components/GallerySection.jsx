import { useState, useRef } from "react";
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
  const galleryRef = useRef(null);

  const filteredItems =
    filter === "ទាំងអស់"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // Scroll Functions for Left and Right
  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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

        {/* Gallery Grid with Navigation Buttons */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg focus:outline-none sm:hidden z-10"
          >
            {"<"}
          </button>

          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 px-1 snap-x snap-mandatory -webkit-overflow-scrolling-touch no-scrollbar"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-0 flex-shrink-0 group relative overflow-hidden rounded-lg shadow-md cursor-pointer snap-start"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: "cover" }}
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

          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg focus:outline-none sm:hidden"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
