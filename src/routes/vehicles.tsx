import { createFileRoute } from "@tanstack/react-router";
import { VehicleBrowser, validateFilters } from "@/components/VehicleBrowser";
import { useAllVehicles } from "@/lib/store";

export const Route = createFileRoute("/vehicles")({
  validateSearch: validateFilters,
  head: () => ({
    meta: [
      { title: "Browse vehicles for sale and lease — Autoluxe" },
      { name: "description", content: "Search and filter premium cars by brand, body type, fuel and transmission." },
      { property: "og:title", content: "Browse vehicles — Autoluxe" },
      { property: "og:description", content: "Search and filter premium cars for sale and lease." },
    ],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const vehicles = useAllVehicles();
  const title = filters.type === "lease" ? "Lease" : filters.type === "sale" ? "For sale" : "All vehicles";
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="eyebrow">Inventory</p>
      <h1 className="mb-8 mt-1 text-5xl">{title}</h1>
      <VehicleBrowser vehicles={vehicles} filters={filters} onChange={(f) => navigate({ search: f, replace: true })} />
    </div>
  );
}
