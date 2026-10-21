import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, slugify } from "@/data/vehicles";
import { useAllVehicles } from "@/lib/store";
import { VehicleImage } from "@/components/VehicleCard";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Shop by brand — Autoluxe" },
      { name: "description", content: "Explore Porsche, BMW, Mercedes-Benz, Ferrari and more premium brands." },
      { property: "og:title", content: "Shop by brand — Autoluxe" },
      { property: "og:description", content: "Explore premium vehicle brands." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const all = useAllVehicles();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="eyebrow">Marques</p>
      <h1 className="mb-8 mt-1 text-5xl">Shop by brand</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((b) => {
          const list = all.filter((v) => v.brand === b);
          return (
            <Link key={b} to="/brands/$brand" params={{ brand: slugify(b) }} className="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-muted">
              {list[0] && <VehicleImage src={list[0].image} alt={b} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-hero-fade" />
              <div className="absolute bottom-4 left-4 text-primary-foreground">
                <h2 className="text-3xl">{b}</h2>
                <p className="text-xs opacity-80">{list.length} vehicles</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
