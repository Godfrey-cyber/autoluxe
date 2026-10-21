import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { formatPrice } from "@/data/vehicles";
import { useAllVehicles } from "@/lib/store";
import { VehicleImage } from "./VehicleCard";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const all = useAllVehicles();
  const navigate = useNavigate();
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return all.filter((v) => `${v.brand} ${v.model} ${v.body} ${v.fuel} ${v.year}`.toLowerCase().includes(s)).slice(0, 6);
  }, [q, all]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-overlay p-4 pt-20 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto max-w-xl overflow-hidden rounded-lg bg-popover shadow-card" onClick={(e) => e.stopPropagation()}>
        <form className="flex items-center gap-3 border-b px-4"
          onSubmit={(e) => { e.preventDefault(); onClose(); navigate({ to: "/vehicles", search: { q } }); }}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand, model, body type…"
            className="h-14 flex-1 bg-transparent text-sm outline-none" />
          <button type="button" onClick={onClose} aria-label="Close"><X className="h-4 w-4" /></button>
        </form>
        <div className="max-h-[60vh] overflow-y-auto">
          {q && results.length === 0 && <p className="p-6 text-sm text-muted-foreground">No vehicles match "{q}".</p>}
          {results.map((v) => (
            <Link key={v.id} to="/vehicle/$id" params={{ id: v.id }} onClick={onClose} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
              <VehicleImage src={v.image} alt={v.model} className="h-12 w-16 rounded object-cover" />
              <div className="flex-1"><p className="text-sm font-semibold">{v.brand} {v.model}</p><p className="text-xs text-muted-foreground">{v.year} · {v.listingType}</p></div>
              <p className="text-sm">{formatPrice(v)}</p>
            </Link>
          ))}
          {!q && <p className="p-6 text-sm text-muted-foreground">Try "Porsche", "SUV" or "Electric".</p>}
        </div>
      </div>
    </div>
  );
}
