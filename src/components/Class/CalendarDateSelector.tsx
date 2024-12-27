import { selectedDateAtom } from "@/store/class";
import { addDays, format } from "date-fns";
import { useAtom } from "jotai";

const CalendarDateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="grid grid-cols-7 mb-4 space-x-4">
      {days.map((day) => {
        const isSelected =
          format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
        const formattedDay = format(day, "EEE dd");

        return (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`px-4 py-2 rounded-md ${
              isSelected ? "bg-gray-200 font-bold" : "bg-white border"
            }`}
          >
            <div className="text-xs">{formattedDay.split(" ")[0]}</div>
            <div className="text-sm">{formattedDay.split(" ")[1]}</div>
          </button>
        );
      })}
    </div>
  );
};

export default CalendarDateSelector;
