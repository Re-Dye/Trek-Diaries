import { create } from "zustand";
import type { ReturnFollowedLocation } from "../zodSchema/dbTypes";

interface LocationState {
  locations: Array<ReturnFollowedLocation> | [];
  setLocations: (locations: Array<ReturnFollowedLocation>) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  setLocations: (locations: Array<ReturnFollowedLocation>) => set({ locations }),
}));