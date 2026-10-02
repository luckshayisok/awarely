export default function FocusCard({ title, value, description }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-400 mb-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
