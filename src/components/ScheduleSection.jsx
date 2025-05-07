import { useState } from "react";
import { X } from "lucide-react";
import schedule from "../assets/schedule.jpg";

const trainingOptions = [
  {
    hours: ["តម្លៃហ្វឹកហាត់ ១ម៉ោង", <br />, "Training fee per on hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$15",
    color: "bg-red-500",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ៨ម៉ោង", <br />, "Training fee per 8 hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$120",
    color: "bg-red-500",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ៨ម៉ោង", <br />, "Training fee per ៨ hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ២នាក់",
      <br />,
      "Private lesson, 1 instructor - 2 swimmer",
    ],
    price: "$230",
    color: "bg-yellow-500",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ៨ម៉ោង", <br />, "Training fee per ៨ hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ៣នាក់",
      <br />,
      "Private lesson, 1 instructor - 3 swimmer",
    ],
    price: "$330",
    color: "bg-yellow-500",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ៨ម៉ោង", <br />, "Training fee per ៨ hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ៤នាក់",
      <br />,
      "Private lesson, 1 instructor - 4 swimmer",
    ],
    price: "$420",
    color: "bg-yellow-500",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ១០ម៉ោង", <br />, "Training fee per on hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$140",
    color: "bg-blue-600",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ១៦ម៉ោង", <br />, "Training fee per on hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$230",
    color: "bg-blue-600",
  },
  {
    hours: ["តម្លៃហ្វឹកហាត់ ២០ម៉ោង", <br />, "Foreigner fee per 20 hour"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$280",
    color: "bg-blue-600",
  },
  {
    hours: ["បរទេស ១ម៉ោង", <br />, "Foreigner fee per 1 hours"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$20",
    color: "bg-green-600",
  },
  {
    hours: ["បរទេស ៨ម៉ោង", <br />, "Foreigner fee per 8 hours"],
    type: [
      "ថ្នាក់បង្រៀន គ្រូ១នាក់ សិស្ស ១នាក់",
      <br />,
      "Private lesson, 1 instructor - 1 swimmer",
    ],
    price: "$150",
    color: "bg-green-600",
  },
];

const ScheduleSection = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section id="schedule" className="section-padding bg-white">
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="pb-10 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-aqua-500 mb-4 text-head">
            ថ្នាក់បង្រៀនហែលទឹកកម្រិតមូលដ្ឋាន ដល់កម្រិតខ្ពស់
          </h2>
          <p className="text-gray-700 text-xl text-aqua-500​ text-body text-aqua-500 mt-6 pb-5">
            កាលវិភាគ សម្រាប់ការហ្វឹកហាត់ ថ្ងៃចន្ទ-សុក្រ និងថ្ងៃសៅរ៍-អាទិត្យ
          </p>
          <img src={schedule} alt="" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-aqua-500 mb-4 text-head">
          ថ្នាក់បង្រៀនហែលទឹកកម្រិតមូលដ្ឋាន ដល់កម្រិតខ្ពស់
        </h2>
        <p className="text-gray-700 text-xl text-aqua-500​ text-body text-aqua-500 mt-6">
          តារាងតម្លៃថ្នាក់បង្រៀនហែលទឹកគ្រប់កម្រិតថ្នាក់
        </p>
        <div className="w-24 h-1 bg-aqua-500 mx-auto my-4"></div>

        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="bg-aqua-500 text-white px-6 py-2 rounded-lg shadow hover:bg-aqua-600 transition text-body"
        >
          មើលពត៌មានលម្អិត
        </button>

        {showSchedule && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {trainingOptions.map((option, index) => (
              <div
                className="flex justify-between items-center mb-2 bg-black text-body2  rounded-2xl  text-white shadow-lg cursor-pointer transform hover:scale-105 transition"
                onClick={() => setSelectedCard(option)}
              >
                <div
                  key={index}
                  className={`rounded-2xl p-2 text-white shadow-lg  ${option.color}`}
                >
                  <h3 className="">{option.hours}</h3>
                </div>
                <p className="text-white">{option.type}</p>
                <div
                  key={index}
                  className={`rounded-2xl p-4 text-white shadow-lg  ${option.color}`}
                  onClick={() => setSelectedCard(option)}
                >
                  <span className="">{option.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal View */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 max-w-md relative text-body">
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <div
                className={`rounded-xl p-6 text-white ${selectedCard.color}`}
              >
                <h3 className="text-2xl font-bold mb-2">
                  {selectedCard.hours}
                </h3>
                <p className="text-lg mb-4">{selectedCard.type}</p>
                <div className="text-right text-xl font-bold">
                  {selectedCard.price}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
