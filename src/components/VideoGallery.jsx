import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Video, Play } from "lucide-react";
import { cn } from "../lib/utils";
import v2 from "../../public/video/technical1.mp4";
import v3 from "../../public/video/event.mp4";
import v5 from "../../public/video/lesson1.mp4";

const videoItems = [
  {
    id: 1,
    title: "Freestyle Swimming បច្ចេកទេស",
    description:
      "Learn the proper freestyle swimming បច្ចេកទេស with our head coach.",
    videoUrl: v5,
    category: "បច្ចេកទេស",
  },
  {
    id: 2,
    title: "Butterfly Stroke Masterclass",
    videoUrl: v2,
    category: "បច្ចេកទេស",
  },
  {
    id: 4,
    title: "Swimming Club Championship",
    description: "Highlights from our annual swimming championship event.",
    videoUrl: v3,
    category: "ព្រឹត្តិការណ៍",
  },
];

const VideoGallery = () => {
  const [filter, setFilter] = useState("ទាំងអស់");
  const [activeVideo, setActiveVideo] = useState(null);

  const categories = ["ទាំងអស់", "បច្ចេកទេស", "មេរៀន", "ព្រឹត្តិការណ៍"];
  const filteredVideos =
    filter === "ទាំងអស់"
      ? videoItems
      : videoItems.filter((item) => item.category === filter);

  return (
    <section id="videos" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text text-head text-aqua-500">
            កម្រងវីដេអូ
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50​ ">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl relative w-full max-w-md">
              <button
                className="absolute top-2 right-2 text-white p-2 rounded-full  z-10"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
              <video controls autoPlay className="w-full h-auto z-1000">
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{activeVideo.title}</h3>
                {activeVideo.description && (
                  <p className="text-sm text-gray-700">
                    {activeVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="flex overflow-x-auto gap-4 md:gap-1  sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 no-scrollbar">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={cn(
                "w-[90%] sm:min-w-0 flex-shrink-0 group bg-white rounded-xl shadow-md overflow-hidden hover-scale transition-all duration-300 ",
                activeVideo?.id === video.id && "ring-2 ring-aqua-500"
              )}
            >
              <div className="relative aspect-video overflow-hidden ">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover "
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-navy-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="p-4 bg-aqua-500 rounded-full text-white hover:bg-aqua-600 transition-colors"
                    aria-label="Play video"
                  >
                    <Play size={24} />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-navy-700 text-white text-xs px-2 py-1 rounded-md capitalize text-body">
                  {video.category}
                </div>
              </div>
              <div className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full card"
                  onClick={() => setActiveVideo(video)}
                >
                  <Video size={16} className="mr-2" />
                  Watch Video
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
