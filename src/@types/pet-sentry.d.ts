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
    petName: string;
    petType: string;
    gender: string;
    activityType: string;
    collarColor: string | null;
    information?: string;
    specialTraits?: string;
    activityDate: string;
  };
}