import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import apiInstance from '~utils/api/instance';

type QueryKeyTimeline = ['Timeline', {activityType: string}];

const queryFunction = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyTimeline>) => {
  const {activityType} = queryKey[1];
  const { data: response } = await apiInstance.post('/pets/fetch-pets', {
    activityType,
  });

  return response.data;
};

const useTimelineQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyTimeline[1] & {options?: any}) => {
  console.log("useTimelineQuery", options, queryKeyParams)
  const queryKey: QueryKeyTimeline = ['Timeline', {...queryKeyParams}];

  return useQuery(queryKey, queryFunction, options);
};

export {useTimelineQuery};
