import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, X, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { SearchModal } from "./SearchModal";

const NAV = [
  { to: "/vehicles", label: "Buy", search: { type: "sale" } },
  { to: "/vehicles", label: "Lease", search: { type: "lease" } },
  { to: "/brands", label: "Brands" },
  { to: "/sell", label: "Sell" },
] as const;

export function SiteHeader() {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const { favourites } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-8">
        <Link to="/" className="font-display text-2xl">Auto<span className="italic text-accent">luxe</span></Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {NAV.map((n) => <Link key={n.label} to={n.to} {...("search" in n ? { search: n.search } : {})} className="text-muted-foreground hover:text-foreground">{n.label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setSearch(true)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"><Search className="h-4 w-4" /></button>
          <Link to="/saved" aria-label="Saved vehicles" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted">
            <Heart className="h-4 w-4" />
            {favourites.length > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] font-bold">{favourites.length}</span>}
          </Link>
          <button aria-label="User" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"><User className="h-4 w-4" /></button>
          <button onClick={() => setMenu(!menu)} aria-label="Menu" className="grid h-10 w-10 place-items-center md:hidden">{menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </div>
      {menu && (
        <nav className="flex flex-col border-t px-4 py-2 md:hidden">
          {NAV.map((n) => <Link key={n.label} to={n.to} {...("search" in n ? { search: n.search } : {})} onClick={() => setMenu(false)} className="py-3 text-sm">{n.label}</Link>)}
        </nav>
      )}
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground md:flex-row md:justify-between md:px-8">
        <p className="font-display text-xl text-foreground">Autoluxe</p>
        <p>Curated vehicles for sale and lease. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
