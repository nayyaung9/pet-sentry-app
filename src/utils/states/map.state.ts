import create from 'zustand';

interface MapState {
  pickedCoordinates: PetSentry.CoordinatesProps;
  addressName: string | null;
  setMapState: ({
    coordinates,
    address,
  }: {
    coordinates?: PetSentry.CoordinatesProps;
    address?: string | null;
  }) => void;
}

export const useMapState = create<MapState>()(set => ({
  pickedCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  addressName: null,
  setMapState: ({coordinates, address}) =>
    set({
      pickedCoordinates: {
        latitude: coordinates?.latitude as number,
        longitude: coordinates?.longitude as number,
      },
      addressName: address,
    }),
}));
