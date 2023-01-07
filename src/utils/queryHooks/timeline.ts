import {
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import apiInstance from '~utils/api/instance';

type QueryKeyTimeline = ['Timeline', {activityType: string}];
export type QueryKeyTimelineDetail = ['Timeline', {id: string}];

const queryFunction = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyTimeline>) => {
  const {activityType} = queryKey[1];
  const {data: response} = await apiInstance.post('/pets/fetch-pets', {
    activityType,
  });

  return response.data;
};

const useTimelineQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyTimeline[1] & {options?: any}) => {
  const queryKey: QueryKeyTimeline = ['Timeline', {...queryKeyParams}];

  return useQuery(queryKey, queryFunction, options);
};

/** Query for Timeline Detail */
const timelineDetailQueryFunction = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyTimelineDetail>) => {
  const {id} = queryKey[1];
  const {data: response} = await apiInstance.get(`/pets/pet/${id}`);

  return response.data;
};

const useTimelineDetailQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyTimelineDetail[1] & {options?: any}) => {
  const queryKey: QueryKeyTimelineDetail = ['Timeline', {...queryKeyParams}];

  return useQuery(queryKey, timelineDetailQueryFunction, options);
};

/** Query for mutation Pet Missing and Found */
type MutationVarsMissingPet = {
  petName: string;
  petType: string;
  gender: string;
  activityType: 'Missing' | 'Found';
  collarColor: string | null;
  address: string | null,
  geolocation: Array<Number | null>,
  information?: string;
  specialTraits?: string;
  activityDate: Date;
};

const mutationFunction = async (params: MutationVarsMissingPet) => {
  const {data: response} = await apiInstance.post('/pets/create-new-pet', {
    ...params,
  });

  return response.data;
};

const useMissingPetMutation = (
  options: UseMutationOptions<
    PetSentry.MissingPetInputDTO,
    AxiosError,
    MutationVarsMissingPet
  >,
) => {
  return useMutation(mutationFunction, options);
};

export {useTimelineQuery, useTimelineDetailQuery, useMissingPetMutation};
