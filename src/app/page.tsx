// src/app/page.tsx
import IncidentDashboard from "@/components/dashboard/IncidentDashboard";

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-background">
      <IncidentDashboard />
    </main>
  );
}
