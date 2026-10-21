import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";

export type Filters = { q?: string | undefined; type?: "sale" | "lease" | undefined; brand?: string | undefined; body?: string | undefined; fuel?: string | undefined; transmission?: string | undefined; sort?: string | undefined };

const uniq = (arr: string[]) => [...new Set(arr)].sort();

export function VehicleBrowser({ vehicles, filters, onChange, hideBrand }: {
  vehicles: Vehicle[]; filters: Filters; onChange: (f: Filters) => void; hideBrand?: boolean;
}) {
  const [open, setOpen] = useState(false);
  // Filter options derive from the vehicles in scope (e.g. one brand).
  const options = useMemo(() => ({
    brand: uniq(vehicles.map((v) => v.brand)),
    body: uniq(vehicles.map((v) => v.body)),
    fuel: uniq(vehicles.map((v) => v.fuel)),
    transmission: uniq(vehicles.map((v) => v.transmission)),
  }), [vehicles]);

  const results = useMemo(() => {
    const q = filters.q?.toLowerCase().trim();
    const r = vehicles.filter((v) =>
      (!q || `${v.brand} ${v.model} ${v.body} ${v.fuel}`.toLowerCase().includes(q)) &&
      (!filters.type || v.listingType === filters.type) &&
      (!filters.brand || v.brand === filters.brand) &&
      (!filters.body || v.body === filters.body) &&
      (!filters.fuel || v.fuel === filters.fuel) &&
      (!filters.transmission || v.transmission === filters.transmission));
    const s = filters.sort;
    return [...r].sort((a, b) => s === "price-asc" ? a.price - b.price : s === "price-desc" ? b.price - a.price : s === "mileage" ? a.mileage - b.mileage : b.year - a.year);
  }, [vehicles, filters]);

  const select = (key: keyof Filters, label: string, opts: string[]) => (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <select className="input-field mt-1.5" value={filters[key] ?? ""} onChange={(e) => onChange({ ...filters, [key]: e.target.value || undefined })}>
        <option value="">All</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className={`${open ? "block" : "hidden"} space-y-4 lg:block`}>
        <input className="input-field" placeholder="Search…" value={filters.q ?? ""} onChange={(e) => onChange({ ...filters, q: e.target.value || undefined })} />
        <div className="grid grid-cols-3 gap-1 rounded-md bg-muted p-1 text-xs font-semibold">
          {([undefined, "sale", "lease"] as const).map((t) => (
            <button key={t ?? "all"} onClick={() => onChange({ ...filters, type: t })} className={`rounded py-2 capitalize ${filters.type === t ? "bg-card shadow-card" : "text-muted-foreground"}`}>{t ?? "All"}</button>
          ))}
        </div>
        {!hideBrand && select("brand", "Brand", options.brand)}
        {select("body", "Body", options.body)}
        {select("fuel", "Fuel", options.fuel)}
        {select("transmission", "Transmission", options.transmission)}
        <button className="text-xs text-muted-foreground underline" onClick={() => onChange({})}>Clear filters</button>
      </aside>
      <div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{results.length} vehicles</p>
          <div className="flex gap-2">
            <button className="btn-ghost lg:hidden" onClick={() => setOpen(!open)}><SlidersHorizontal className="h-4 w-4" />Filters</button>
            <select className="input-field w-auto" value={filters.sort ?? ""} onChange={(e) => onChange({ ...filters, sort: e.target.value || undefined })}>
              <option value="">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="mileage">Lowest mileage</option>
            </select>
          </div>
        </div>
        {results.length === 0 ? <p className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">No vehicles match these filters.</p> : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{results.map((v) => <VehicleCard key={v.id} v={v} />)}</div>
        )}
      </div>
    </div>
  );
}

export function validateFilters(s: Record<string, unknown>): Filters {
  const str = (k: string) => (typeof s[k] === "string" && s[k] ? (s[k] as string) : undefined);
  const type = str("type");
  return { q: str("q"), type: type === "sale" || type === "lease" ? type : undefined, brand: str("brand"), body: str("body"), fuel: str("fuel"), transmission: str("transmission"), sort: str("sort") };
}
