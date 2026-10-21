import { useSyncExternalStore } from "react";
import { VEHICLES, type Vehicle } from "@/data/vehicles";

// Mock persistence in localStorage until a real backend is connected.
type State = { favourites: string[]; listings: Vehicle[]; seller: { id: string; name: string; email: string } | null };
const KEY = "autoluxe-state";
const empty: State = { favourites: [], listings: [], seller: null };
let state: State = empty;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try { state = { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { /* ignore */ }
}
function set(next: Partial<State>) {
  state = { ...state, ...next };
  localStorage.setItem(KEY, JSON.stringify(state));
  subs.forEach((f) => f());
}
const subscribe = (f: () => void) => { load(); subs.add(f); f(); return () => subs.delete(f); };

export function useStore() {
  return useSyncExternalStore(subscribe, () => { load(); return state; }, () => empty);
}

export const actions = {
  toggleFavourite(id: string) {
    set({ favourites: state.favourites.includes(id) ? state.favourites.filter((f) => f !== id) : [...state.favourites, id] });
  },
  register(name: string, email: string) { set({ seller: { id: crypto.randomUUID(), name, email } }); },
  signOut() { set({ seller: null }); },
  addListing(v: Vehicle) { set({ listings: [v, ...state.listings] }); },
  removeListing(id: string) { set({ listings: state.listings.filter((l) => l.id !== id) }); },
};

export function useAllVehicles(): Vehicle[] {
  const { listings } = useStore();
  return [...listings, ...VEHICLES];
}
