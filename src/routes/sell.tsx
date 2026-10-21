import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Trash2 } from "lucide-react";
import { BRANDS, formatPrice, type Vehicle } from "@/data/vehicles";
import { actions, useStore } from "@/lib/store";
import { VehicleImage } from "@/components/VehicleCard";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell or lease your car — Autoluxe" },
      { name: "description", content: "Register as a seller and publish your vehicle listing in minutes." },
      { property: "og:title", content: "Sell your car — Autoluxe" },
      { property: "og:description", content: "Register as a seller and publish your vehicle listing." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const { seller, listings } = useStore();
  if (!seller) return <Register />;
  const mine = listings.filter((l) => l.sellerId === seller.id);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Seller dashboard</p><h1 className="mt-1 text-5xl">Welcome, {seller.name}</h1></div>
        <button className="btn-ghost" onClick={actions.signOut}>Sign out</button>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <ListingForm sellerId={seller.id} />
        <section>
          <h2 className="mb-4 text-3xl">Your listings</h2>
          {mine.length === 0 ? <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">No listings yet.</p> : (
            <ul className="space-y-3">
              {mine.map((v) => (
                <li key={v.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                  <VehicleImage src={v.image} alt={v.model} className="h-14 w-20 rounded object-cover" />
                  <Link to="/vehicle/$id" params={{ id: v.id }} className="flex-1">
                    <p className="text-sm font-semibold">{v.year} {v.brand} {v.model}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(v)} · for {v.listingType}</p>
                  </Link>
                  <button aria-label="Delete listing" onClick={() => actions.removeListing(v.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="eyebrow">Sellers</p>
      <h1 className="mt-1 text-5xl">Sell with Autoluxe</h1>
      <p className="mt-3 text-sm text-muted-foreground">Create a seller account to publish and manage your listings.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); if (name.trim() && /\S+@\S+\.\S+/.test(email)) actions.register(name.trim(), email.trim()); }}>
        <input required className="input-field" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input required type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full">Create seller account</button>
      </form>
    </div>
  );
}

const field = (label: string, el: React.ReactNode) => <label className="block"><span className="eyebrow">{label}</span><div className="mt-1.5">{el}</div></label>;

function ListingForm({ sellerId }: { sellerId: string }) {
  const [msg, setMsg] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const brand = g("brand"), model = g("model");
    const v: Vehicle = {
      id: `${brand}-${model}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand, model, year: Number(g("year")), price: Number(g("price")), listingType: g("listingType") as Vehicle["listingType"],
      mileage: Number(g("mileage")), fuel: g("fuel") as Vehicle["fuel"], transmission: g("transmission") as Vehicle["transmission"],
      body: g("body") as Vehicle["body"], color: g("color") || "—", location: g("location") || "—", image: g("image"),
      specs: { engine: g("engine") || "—", power: g("power") || "—", torque: "—", acceleration: "—", topSpeed: "—", drivetrain: "—", seats: 5 },
      description: g("description"), sellerId,
    };
    actions.addListing(v);
    e.currentTarget.reset();
    setMsg(`${brand} ${model} is now live.`);
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border bg-card p-6">
      <h2 className="text-3xl">New listing</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("Brand", <select name="brand" className="input-field">{BRANDS.map((b) => <option key={b}>{b}</option>)}</select>)}
        {field("Model", <input required name="model" className="input-field" />)}
        {field("Year", <input required name="year" type="number" min={1950} max={2027} defaultValue={2022} className="input-field" />)}
        {field("Listing type", <select name="listingType" className="input-field"><option value="sale">Sale</option><option value="lease">Lease</option></select>)}
        {field("Price (USD, monthly if lease)", <input required name="price" type="number" min={1} className="input-field" />)}
        {field("Mileage (km)", <input required name="mileage" type="number" min={0} className="input-field" />)}
        {field("Fuel", <select name="fuel" className="input-field">{["Petrol", "Diesel", "Hybrid", "Electric"].map((o) => <option key={o}>{o}</option>)}</select>)}
        {field("Transmission", <select name="transmission" className="input-field"><option>Automatic</option><option>Manual</option></select>)}
        {field("Body", <select name="body" className="input-field">{["Sedan", "SUV", "Coupe", "Convertible", "Hatchback"].map((o) => <option key={o}>{o}</option>)}</select>)}
        {field("Colour", <input name="color" className="input-field" />)}
        {field("Engine", <input name="engine" className="input-field" />)}
        {field("Power", <input name="power" placeholder="e.g. 300 hp" className="input-field" />)}
        {field("Location", <input name="location" className="input-field" />)}
        {field("Photo URL", <input name="image" type="url" placeholder="https://…" className="input-field" />)}
      </div>
      {field("Description", <textarea required name="description" rows={3} className="input-field" />)}
      <button className="btn-primary w-full">Publish listing</button>
      {msg && <p className="text-sm text-accent-foreground">{msg}</p>}
    </form>
  );
}
