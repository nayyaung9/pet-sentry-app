import create from 'zustand';

interface CoordinatesProps {
  latitude: Number | null;
  longitude: Number | null;
}

interface MapState {
  pickedCoordinates: CoordinatesProps;
  addressName: string | null;
  setMapState: ({
    coordinates,
    address,
  }: {
    coordinates: CoordinatesProps;
    address?: string | null;
  }) => void;
}

export const useMapState = create<MapState>()(set => ({
  pickedCoordinates: {
    latitude: null,
    longitude: null,
  },
  addressName: null,
  setMapState: ({coordinates, address}) =>
    set({
      pickedCoordinates: {
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      },
      addressName: address,
    }),
}));
