import { createFileRoute, notFound } from "@tanstack/react-router";
import { BRANDS, slugify } from "@/data/vehicles";
import { VehicleBrowser, validateFilters } from "@/components/VehicleBrowser";
import { useAllVehicles } from "@/lib/store";

export const Route = createFileRoute("/brands/$brand")({
  validateSearch: validateFilters,
  loader: ({ params }) => {
    const name = BRANDS.find((b) => slugify(b) === params.brand);
    if (!name) throw notFound();
    return { name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Brand"} vehicles — Autoluxe` },
      { name: "description", content: `Browse ${loaderData?.name ?? ""} cars for sale and lease.` },
      { property: "og:title", content: `${loaderData?.name ?? "Brand"} vehicles — Autoluxe` },
      { property: "og:description", content: `Browse ${loaderData?.name ?? ""} cars for sale and lease.` },
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  const { name } = Route.useLoaderData();
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const vehicles = useAllVehicles().filter((v) => v.brand === name);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="eyebrow">Brand</p>
      <h1 className="mb-8 mt-1 text-5xl">{name}</h1>
      <VehicleBrowser hideBrand vehicles={vehicles} filters={filters} onChange={(f) => navigate({ search: f, replace: true })} />
    </div>
  );
}
