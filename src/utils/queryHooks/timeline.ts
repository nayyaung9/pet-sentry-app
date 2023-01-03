import {QueryFunctionContext, useQuery} from '@tanstack/react-query';
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
  console.log('qk', id)
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

export {useTimelineQuery, useTimelineDetailQuery};
