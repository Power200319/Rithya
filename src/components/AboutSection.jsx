import { useState, useRef, useEffect } from "react";
import v1 from "../assets/about1.jpg";
import p1 from "../assets/about.png";
import gift from "../assets/vd.gif";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDetailId, setExpandedDetailId] = useState(null);
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dialogRef = useRef(null);

  // Fetch about data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/about/');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const [aboutDetails, setAboutDetails] = useState([]);

  // Fetch about details from API
  useEffect(() => {
    const fetchAboutDetails = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/about-details/');
        if (response.ok) {
          const data = await response.json();
          setAboutDetails(data);
        }
      } catch (error) {
        console.error('Error fetching about details:', error);
      }
    };

    fetchAboutDetails();
  }, []);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const toggleDescription = (id) => {
    setExpandedDetailId(expandedDetailId === id ? null : id);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutDetails.length);
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + aboutDetails.length) % aboutDetails.length
    );
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  };

  return (
    <section id="about" className="bg-[#e6f3f7] py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Profile Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative rounded-full overflow-hidden border-4 border-white shadow-lg w-54 h-54 mb-6 hover:scale-105 transition-transform duration-300">
            <img
              src={aboutData.length > 0 && aboutData[0].image_url ? aboutData[0].image_url : p1}
              alt="Instructor"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-head font-semibold text-aqua-600 mb-2 underline">
            អំពីយើង
          </h3>
          <p
            className={`text-gray-800 text-body leading-relaxed max-w-md  ${
              expanded ? "" : "line-clamp-1"
            }`}
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            {aboutData.length > 0 ? <>&nbsp;&nbsp;&nbsp;{aboutData[0].description}</> : (
              <>
                &nbsp;&nbsp;&nbsp;ស្វែងយល់ពីអ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងអំពីកីឡាហែលទឹករបស់កម្ពុជា
                ពីគ្រូដែលមានបទពិសោធន៏ អតីតកីឡាករ
                កីឡាការិនីជម្រើសជាតិធ្លាប់ចូលរួមប្រកួតហែលទឹកទាំង ថ្នាក់ជាតិ
                និងអន្តរជាតិនិងជាពិសេសដែលទទួលស្គាល់ពី សហព័ន្ធខ្មែរកីឡាហែលទឹក
                ដែលបានចូលរួមបណ្តុះបណ្តាល ទាំងទ្រឹស្តី និងអនុវត្តន៏
                ពីការបង្ហាត់បង្រៀនការរៀបចំផែនការហាត់ហ្វឹកហ្វឺន
                លើបច្ចេកទេសកីឡាហែលទឹកចាប់ផ្តើមពីកម្រិតមូលដ្ឋាន
                រហូតដល់កម្រិតខ្ពស់បំផុត។
              </>
            )}
          </p>
          <button
            onClick={toggleReadMore}
            className="mt-2 text-sm text-blue-600 hover:underline z-10 relative text-body"
            style={{ pointerEvents: "auto" }}
          >
            {expanded ? "បិទ" : "អានបន្ថែម"}
          </button>
        </div>

        <div className="block md:hidden">
          <img src={gift} alt="" />
        </div>
        {/* RIGHT: Image and Description */}
        {/* Mobile View with Horizontal Scroll */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading about details...</p>
          </div>
        ) : (
          <div className="block md:hidden w-full overflow-x-auto scroll-smooth pb-4 no-scrollbar">
            <div className="flex gap-4 min-w-max px-2">
              {aboutDetails.map((detail) => (
              <div
                key={detail.id || detail.title}
                className="w-full max-w-[354px] flex-shrink-0 text-body snap-center"
              >
                <Card className="overflow-hidden shadow-lg border-0">
                  <div className="w-full h-[250px] overflow-hidden">
                    <img
                      src={detail.image_url || detail.image}
                      alt={detail.title}
                      className=" h-full  transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-xl font-bold text-navy-800 text-body mb-3 ${expandedDetailId === (detail.id || detail.title) ? '' : 'truncate'}`}>
                      {detail.title}
                    </h3>
                    {expandedDetailId === (detail.id || detail.title) ? (
                      <div
                        className="text-gray-700 text-sm space-y-2 mb-6"
                        style={{ textAlign: "justify", textJustify: "inter-word" }}
                        dangerouslySetInnerHTML={{ __html: detail.description }}
                      />
                    ) : (
                      <div className="mb-6 h-5"></div>
                    )}
                    <Button
                      variant="outline"
                      className="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => toggleDescription(detail.id || detail.title)}
                    >
                      {expandedDetailId === (detail.id || detail.title) ? "បិទ" : "អានបន្ថែម"}
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Desktop View */}
        <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <img
                  src={aboutDetails[currentIndex]?.image_url || aboutDetails[currentIndex]?.image || v1}
                  alt="Instructor"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy-800 mb-2 text-head">
                    ព័ត៌មាន​បន្ថែម
                  </h3>
                  <button className="mt-2 text-sm text-blue-600 hover:underline text-body">
                    អានបន្ថែម
                  </button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent key={currentIndex} ref={dialogRef} className="sm:max-w-[600px] bg-white max-h-[500px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-head">
                  {aboutDetails[currentIndex]?.title}
                </DialogTitle>
                <DialogDescription>
                  <img
                    src={aboutDetails[currentIndex]?.image_url || aboutDetails[currentIndex]?.image}
                    alt="Detail image"
                    loading="lazy"
                    className="w-full h-64 object-cover mt-4 rounded-lg"
                  />
                  <p
                    className="list-disc list-inside text-gray-700 text-sm space-y-2 text-body mt-4"
                    style={{ textAlign: "justify", textJustify: "inter-word" }}
                    dangerouslySetInnerHTML={{ __html: aboutDetails[currentIndex]?.description }}
                  />
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between mt-4">
                <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

