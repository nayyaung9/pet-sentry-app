import create from 'zustand';

interface GeoState {
  location: string;
  userCoordinates?: PetSentry.CoordinatesProps;
  userAddress?: string;
  setLocation: (name: string) => void;
  setUserAddress: (name: string) => void;
  setUserCoordinates: (coordinates: PetSentry.CoordinatesProps) => void;
}

export const useGeoState = create<GeoState>()(set => ({
  location: '',
  setLocation: name => set({location: name}),
  setUserAddress: name => set({userAddress: name}),
  setUserCoordinates: coordinates =>
    set({
      userCoordinates: {
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      },
    }),
}));
