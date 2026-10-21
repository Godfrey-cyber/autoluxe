import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { FALLBACK_IMAGE, formatPrice, type Vehicle } from "@/data/vehicles";
import { actions, useStore } from "@/lib/store";

export function VehicleImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src || FALLBACK_IMAGE} alt={alt} loading="lazy" className={className}
    onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }} />;
}

export function FavouriteButton({ id, className = "" }: { id: string; className?: string }) {
  const { favourites } = useStore();
  const on = favourites.includes(id);
  return (
    <button aria-label={on ? "Remove from saved" : "Save vehicle"} onClick={(e) => { e.preventDefault(); actions.toggleFavourite(id); }}
      className={`grid h-9 w-9 place-items-center rounded-full bg-card/90 backdrop-blur transition hover:scale-105 ${className}`}>
      <Heart className={`h-4 w-4 ${on ? "fill-accent text-accent" : "text-foreground"}`} />
    </button>
  );
}

export function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link to="/vehicle/$id" params={{ id: v.id }} className="group block overflow-hidden rounded-lg bg-card shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <VehicleImage src={v.image} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest">
          For {v.listingType}
        </span>
        <FavouriteButton id={v.id} className="absolute right-3 top-3" />
      </div>
      <div className="p-4">
        <p className="eyebrow">{v.brand} · {v.year}</p>
        <h3 className="mt-1 text-2xl leading-tight">{v.model}</h3>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-xs text-muted-foreground">{v.mileage.toLocaleString()} km · {v.fuel} · {v.transmission}</p>
          <p className="font-semibold">{formatPrice(v)}</p>
        </div>
      </div>
    </Link>
  );
}
