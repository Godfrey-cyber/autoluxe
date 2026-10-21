import { createFileRoute, Link } from "@tanstack/react-router";
import { useAllVehicles, useStore } from "@/lib/store";
import { VehicleCard } from "@/components/VehicleCard";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved vehicles — Autoluxe" },
      { name: "description", content: "Your shortlist of favourite vehicles." },
      { property: "og:title", content: "Saved vehicles — Autoluxe" },
      { property: "og:description", content: "Your shortlist of favourite vehicles." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { favourites } = useStore();
  const saved = useAllVehicles().filter((v) => favourites.includes(v.id));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="eyebrow">Favourites</p>
      <h1 className="mb-8 mt-1 text-5xl">Saved vehicles</h1>
      {saved.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">Tap the heart on any vehicle to save it here.</p>
          <Link to="/vehicles" className="btn-primary mt-5">Browse vehicles</Link>
        </div>
      ) : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{saved.map((v) => <VehicleCard key={v.id} v={v} />)}</div>}
    </div>
  );
}
