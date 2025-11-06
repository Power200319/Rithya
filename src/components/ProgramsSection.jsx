import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "./ui/Card";

const ProgramsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedProgramId, setExpandedProgramId] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/programs/');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data);
        }
      } catch (error) {
        console.error('Error fetching programs data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

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

  const toggleDescription = (id) => {
    setExpandedProgramId(expandedProgramId === id ? null : id);
  };

  return (
    <section id="programs" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-head text-aqua-500 md:text-3xl mb-4 gradient-text">
            កម្មវិធីបណ្តុះបណ្តាលហែលទឹក
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>


        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 mb-12 ">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? "bg-aqua-500 text-white"
                  : "bg-white text-gray-700 hover:bg-aqua-100"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Mobile View with Horizontal Scroll */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading programs...</p>
          </div>
        ) : (
          <div className="block md:hidden w-full overflow-x-auto scroll-smooth pb-4 no-scrollbar ">
            <div className="flex gap-4 min-w-max px-2">
              {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="min-w-[300px] flex-shrink-0 text-body snap-center"
              >
                <Card className="overflow-hidden shadow-lg border-0">
                  <div className="w-full h-[250px] overflow-hidden">
                    <img
                      src={program.image_url || program.image}
                      alt={program.title}
                      className=" h-full  transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-navy-800 text-body">
                        {program.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          program.level === "Basic"
                            ? "bg-blue-300 text-black"
                            : program.level === "Intermediate"
                            ? "bg-blue-300 text-black"
                            : program.level === "Advanced"
                            ? "bg-blue-300 text-black"
                            : program.level === "Highest"
                            ? "bg-blue-300 text-black"
                            : "bg-blue-300 text-black"
                        }`}
                      >
                        {program.level}
                      </span>
                    </div>
                    {expandedProgramId === program.id ? (
                      <div className="text-gray-700 text-sm mb-6">
                        {program.description}
                      </div>
                    ) : (
                      <div className="mb-6 h-5"></div>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => toggleDescription(program.id)}
                    >
                      <Link to="#">
                        {expandedProgramId === program.id ? "បិទ" : "អានបន្ថែម"}
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Desktop View */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading programs...</p>
          </div>
        ) : (
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-body">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="hover-scale">
              <Card className="overflow-hidden shadow-lg border-0">
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.image_url || program.image}
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
                  {expandedProgramId === program.id ? (
                    <div className="text-gray-700 text-sm mb-6">
                      {program.description}
                    </div>
                  ) : (
                    <div className="mb-6 h-5"></div>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => toggleDescription(program.id)}
                  >
                    <Link to="#">
                      {expandedProgramId === program.id ? "បិទ" : "អានបន្ថែម"}
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
