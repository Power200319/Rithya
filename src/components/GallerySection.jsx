import { useState, useEffect } from "react";
// import { GalleryHorizontal } from "lucide-react";

const GallerySection = () => {
  const [filter, setFilter] = useState("ទាំងអស់");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/gallery/');
        if (response.ok) {
          const data = await response.json();
          setGalleryItems(data);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading gallery...</p>
          </div>
        ) : (
          <div className="flex md:grid overflow-x-auto gap-6 md:grid-cols-3 pb-4 -mx-4 px-4 no-scrollbar">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] md:min-w-0 flex-shrink-0 rounded-full bg-gray-50 hover-scale transition-all duration-300 group"
              >
                <img
                  src={item.image_url || item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-64 lg:w-full bg-white shadow-md rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 w-full p-4 text-white flex items-center">
                    <GalleryHorizontal size={18} className="mr-2" />
                    <span>{item.title}</span>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
