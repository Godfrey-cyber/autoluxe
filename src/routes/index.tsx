import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { BRANDS, VEHICLES, slugify } from "@/data/vehicles";
import { VehicleCard, VehicleImage } from "@/components/VehicleCard";

const HERO = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Autoluxe — Premium cars for sale and lease" },
      { name: "description", content: "Browse curated premium vehicles by brand and specification. Buy or lease, save favourites, or list your own car." },
      { property: "og:title", content: "Autoluxe — Premium cars for sale and lease" },
      { property: "og:description", content: "Browse curated premium vehicles by brand and specification." },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <section className="relative h-[82vh] min-h-[520px] overflow-hidden">
        <VehicleImage src={HERO} alt="Porsche 911 on the road" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 text-primary-foreground md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">Curated · Inspected · Delivered</p>
          <h1 className="mt-3 max-w-3xl text-5xl leading-[1.02] md:text-7xl">The finer way to <span className="italic">buy or lease</span> your next car.</h1>
          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/vehicles", search: { q: q || undefined } }); }}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-lg bg-card p-2 text-card-foreground">
            <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand or model" className="flex-1 bg-transparent px-1 text-sm outline-none" />
            <button className="btn-primary">Search</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <p className="eyebrow">Browse by brand</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {BRANDS.map((b) => <Link key={b} to="/brands/$brand" params={{ brand: slugify(b) }} className="btn-ghost">{b}</Link>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-4xl">Featured vehicles</h2>
          <Link to="/vehicles" className="flex items-center gap-1 text-sm font-semibold">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{VEHICLES.slice(0, 6).map((v) => <VehicleCard key={v.id} v={v} />)}</div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-4 px-4 md:grid-cols-2 md:px-8">
        {(["sale", "lease"] as const).map((t) => (
          <Link key={t} to="/vehicles" search={{ type: t }} className="rounded-lg bg-primary p-10 text-primary-foreground transition hover:opacity-95">
            <p className="text-xs uppercase tracking-[0.25em] opacity-70">{t === "sale" ? "Own it" : "Drive it"}</p>
            <h3 className="mt-2 text-4xl">{t === "sale" ? "Cars for sale" : "Flexible leasing"}</h3>
            <p className="mt-3 flex items-center gap-1 text-sm opacity-80">Explore <ArrowRight className="h-4 w-4" /></p>
          </Link>
        ))}
      </section>
    </>
  );
}
