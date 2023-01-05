declare namespace PetSentry {
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
