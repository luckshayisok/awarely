export default function Timeline() {
  const events = [
    { time: "9:00 AM", action: "Opened VS Code", focus: "High" },
    { time: "10:30 AM", action: "Browsed Twitter", focus: "Low" },
    { time: "11:15 AM", action: "Resumed coding", focus: "High" },
    { time: "1:00 PM", action: "YouTube break", focus: "Medium" },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Activity Timeline</h2>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-800 pb-3"
          >
            <div>
              <p className="text-white font-medium">{event.action}</p>
              <p className="text-gray-500 text-sm">{event.time}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                event.focus === "High"
                  ? "bg-green-500/20 text-green-400"
                  : event.focus === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {event.focus}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
