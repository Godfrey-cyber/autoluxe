import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { VEHICLES, formatPrice, slugify } from "@/data/vehicles";
import { useAllVehicles } from "@/lib/store";
import { FavouriteButton, VehicleCard, VehicleImage } from "@/components/VehicleCard";

export const Route = createFileRoute("/vehicle/$id")({
  head: ({ params }) => {
    const v = VEHICLES.find((x) => x.id === params.id);
    const title = v ? `${v.year} ${v.brand} ${v.model} — Autoluxe` : "Vehicle — Autoluxe";
    const desc = v ? v.description : "Vehicle details and specifications.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      ...(v ? [{ property: "og:image", content: v.image }, { name: "twitter:image", content: v.image }] : []),
    ] };
  },
  component: VehiclePage,
});

function VehiclePage() {
  const { id } = Route.useParams();
  const all = useAllVehicles();
  const v = all.find((x) => x.id === id);
  if (!v) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-4xl">Vehicle not found</h1>
      <Link to="/vehicles" className="btn-primary mt-6">Browse vehicles</Link>
    </div>
  );
  const specs: [string, string | number][] = [
    ["Engine", v.specs.engine], ["Power", v.specs.power], ["Torque", v.specs.torque], ["0–100 km/h", v.specs.acceleration],
    ["Top speed", v.specs.topSpeed], ["Drivetrain", v.specs.drivetrain], ["Seats", v.specs.seats], ["Transmission", v.transmission],
    ["Fuel", v.fuel], ["Body", v.body], ["Mileage", `${v.mileage.toLocaleString()} km`], ["Colour", v.color],
  ];
  const related = all.filter((x) => x.brand === v.brand && x.id !== v.id).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <Link to="/vehicles" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />All vehicles</Link>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <VehicleImage src={v.image} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
          <FavouriteButton id={v.id} className="absolute right-4 top-4 h-11 w-11" />
        </div>
        <div>
          <Link to="/brands/$brand" params={{ brand: slugify(v.brand) }} className="eyebrow hover:text-foreground">{v.brand} · {v.year}</Link>
          <h1 className="mt-2 text-5xl leading-none">{v.model}</h1>
          <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{v.location}</p>
          <div className="mt-6 rounded-lg border bg-card p-5">
            <p className="eyebrow">{v.listingType === "lease" ? "Monthly lease" : "Asking price"}</p>
            <p className="mt-1 text-4xl font-display">{formatPrice(v)}</p>
            <a href={`mailto:sales@autoluxe.example?subject=${encodeURIComponent(`${v.brand} ${v.model}`)}`} className="btn-primary mt-4 w-full">
              {v.listingType === "lease" ? "Enquire about leasing" : "Contact seller"}
            </a>
          </div>
          <p className="mt-6 leading-relaxed text-muted-foreground">{v.description}</p>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="mb-5 text-3xl">Technical specifications</h2>
        <dl className="grid overflow-hidden rounded-lg border bg-card sm:grid-cols-2 lg:grid-cols-4">
          {specs.map(([k, val]) => (
            <div key={k} className="border-b p-4 sm:border-r"><dt className="eyebrow">{k}</dt><dd className="mt-1 font-semibold">{val}</dd></div>
          ))}
        </dl>
      </section>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-3xl">More from {v.brand}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <VehicleCard key={r.id} v={r} />)}</div>
        </section>
      )}
    </div>
  );
}
