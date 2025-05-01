import { useState } from "react";
import { Button } from "../components/ui/button";
import { Video, Play } from "lucide-react";
import { cn } from "../lib/utils";
import v1 from "../assets/technical.mp4";
import v2 from "../assets/technical1.mp4";
import v3 from "../assets/event.mp4";
import v4 from "../assets/lesson.mp4";
import v5 from "../assets/lesson1.mp4";
import v6 from "../assets/event2.mp4";

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
    id: 3,
    title: "Kids Swimming Lesson",
    description:
      "Watch how we teach young beginners in a fun and engaging environment.",
    videoUrl: v4,
    category: "មេរៀន",
  },
  {
    id: 4,
    title: "Swimming Club Championship",
    description: "Highlights from our annual swimming championship event.",
    videoUrl: v3,
    category: "ព្រឹត្តិការណ៍",
  },
  {
    id: 5,
    title: "Water Safety Tips",
    description: "Essential water safety instructions for all swimmers.",
    videoUrl: v6,
    category: "មេរៀន",
  },
  {
    id: 6,
    title: "Breathing បច្ចេកទេស",
    description:
      "Improve your breathing pattern while swimming with these expert tips.",
    videoUrl: v1,
    category: "បច្ចេកទេស",
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-head text-aqua-500">
            កម្រងវីដេអូ
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full capitalize transition-all text-body ${
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

        {activeVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl relative w-full max-w-md">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
              <video controls autoPlay className="w-full h-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={cn(
                "group bg-white rounded-xl shadow-md overflow-hidden hover-scale transition-all duration-300",
                activeVideo?.id === video.id && "ring-2 ring-aqua-500"
              )}
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-navy-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                {/* <h3 className="font-bold mb-1 line-clamp-1">{video.title}</h3> */}
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
