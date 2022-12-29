import create from 'zustand';

interface GeoState {
  location: string;
  setLocation: (name: string) => void;
}

export const useGeoState = create<GeoState>()(set => ({
  location: '',
  setLocation: name => set({location: name}),
}));
