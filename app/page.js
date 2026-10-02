import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FocusCard from "../components/FocusCard";
import Timeline from "../components/Timeline";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <FocusCard
            title="Focus Score"
            value="87%"
            description="Your recent focus performance"
          />
          <FocusCard
            title="Screen Time"
            value="5h 32m"
            description="Active productive time today"
          />
          <FocusCard
            title="Predicted Distraction"
            value="Low"
            description="AI predicts high focus stability"
          />
        </section>

        <section className="mt-10">
          <Timeline />
        </section>
      </main>
    </div>
  );
}
