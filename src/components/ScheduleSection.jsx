import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Clock } from "lucide-react";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  {
    time: "07:00 - 08:00",
    classes: {
      Monday: { name: "", level: "" },
      Tuesday: { name: "", level: "" },
      Wednesday: { name: "", level: "" },
      Thursday: { name: "", level: "" },
      Friday: { name: "", level: "" },
      Saturday: { name: "", level: "" },
      Sunday: {},
    },
  },
  {
    time: "08:00 - 09:00",
    classes: {
      Monday: { name: "", level: "" },
      Tuesday: { name: "", level: "" },
      Wednesday: { name: "", level: "" },
      Thursday: { name: "", level: "" },
      Friday: { name: "", level: "" },
      Saturday: { name: "", level: "" },
      Sunday: { name: "", level: "" },
    },
  },
  {
    time: "15:00 - 16:00",
    classes: {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: { name: "", level: "" },
      Sunday: { name: "", level: "" },
    },
  },
  {
    time: "16:00 - 17:00",
    classes: {
      Monday: { name: "", level: "" },
      Tuesday: { name: "", level: "" },
      Wednesday: { name: "", level: "" },
      Thursday: { name: "", level: "" },
      Friday: { name: "", level: "" },
      Saturday: { name: "", level: "" },
      Sunday: {},
    },
  },
  {
    time: "18:00 - 19:00",
    classes: {
      Monday: { name: "", level: "" },
      Tuesday: { name: "", level: "" },
      Wednesday: { name: "", level: "" },
      Thursday: { name: "", level: "" },
      Friday: { name: "", level: "" },
      Saturday: {},
      Sunday: {},
    },
  },
];

const ScheduleSection = () => {
  const [visibleDays, setVisibleDays] = useState(weekDays.slice(0, 5)); // Default to weekdays

  return (
    <section id="schedule" className="section-padding bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text​ text-head text-aqua-500">
            ថ្នាក់បង្រៀនហែលទឹកកម្រិតមូលដ្ឋាន ដល់កម្រិតខ្ពស់
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto text-body text-aqua-400">
            កាលវិភាគ សម្រាប់ការហ្វឹកហាត់​ ថ្ងៃចន្ទដល់សុក្រ និង​
            ថ្ងៃសៅរ៍ដល់​អាទិត្យ
          </p>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6 mt-4"></div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button
            variant={visibleDays.length === 5 ? "default" : "outline"}
            className={visibleDays.length === 5 ? "bg-aqua-500" : ""}
            onClick={() => setVisibleDays(weekDays.slice(0, 5))}
          >
            Weekdays
          </Button>
          <Button
            variant={visibleDays.length === 2 ? "default" : "outline"}
            className={visibleDays.length === 2 ? "bg-aqua-500" : ""}
            onClick={() => setVisibleDays(weekDays.slice(5, 7))}
          >
            Weekend
          </Button>
          <Button
            variant={visibleDays.length === 7 ? "default" : "outline"}
            className={visibleDays.length === 7 ? "bg-aqua-500" : ""}
            onClick={() => setVisibleDays(weekDays)}
          >
            Full Week
          </Button>
        </div>

        {/* Schedule table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-navy-700 text-white">
                <th className="py-3 px-4 text-left">Time</th>
                {weekDays
                  .filter((day) => visibleDays.includes(day))
                  .map((day) => (
                    <th key={day} className="py-3 px-4 text-left">
                      {day}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr
                  key={slot.time}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 border-t flex items-center">
                    <Clock size={16} className="text-aqua-500 mr-2" />
                    <span>{slot.time}</span>
                  </td>
                  {weekDays
                    .filter((day) => visibleDays.includes(day))
                    .map((day) => {
                      const classInfo = slot.classes[day];
                      return (
                        <td key={day} className="py-3 px-4 border-t">
                          {classInfo ? (
                            <div>
                              <div className="font-medium text-navy-700">
                                {classInfo.name}
                              </div>
                              <div
                                className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
                                  classInfo.level === "Beginner"
                                    ? "bg-green-100 text-green-800"
                                    : classInfo.level === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : classInfo.level === "Advanced"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {classInfo.level}
                              </div>
                            </div>
                          ) : (
                            <span className=" text-gray-500">No class</span>
                          )}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-5 text-body text-center">
          <h3 className="bg-aqua-500 text-white p-1.5 rounded-lg">
            ថ្នាក់គ្រូ១នាក់ សិស្ស១នាក់ ១២០$
          </h3>
          <h3 className="bg-aqua-500 text-white p-1.5 rounded-lg">
            ថ្នាក់គ្រូ១នាក់ សិស្ស២នាក់ ២៣០$
          </h3>
          <h3 className="bg-aqua-500 text-white p-1.5 rounded-lg">
            ថ្នាក់គ្រូ១នាក់ សិស្ស៣នាក់ ៣៣០$
          </h3>
          <h3 className="bg-aqua-500 text-white p-1.5 rounded-lg">
            ថ្នាក់គ្រូ១នាក់ សិស្ស៤នាក់ ៤២០$
          </h3>
        </div>
        <div className="mt-8 text-center text-white">
          <Button asChild className="bg-navy-700 hover text-body">
            <a href="/schedule">មើលទាំងអស់</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
