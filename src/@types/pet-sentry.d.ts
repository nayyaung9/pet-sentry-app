declare namespace PetSentry {
  type CollarColor = {
    id: number;
    name: string;
  };
  type PetType = {
    id: number;
    label: string;
  };

  type MissingPetInputDTO = {
    _id?: string;
    petName: string;
    petType: string;
    gender: string;
    activityType: string;
    collarColor: string | null;
    information?: string;
    specialTraits?: string;
    activityDate: string;
  };

  type CoordinatesProps = {
    latitude: number;
    longitude: number;
  }
}
