import {QueryFunctionContext, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GEOCODER_ENDPOINT, GEOCODER_KEY} from '@env';

type QueryKeyGeocoding = ['Geocoding', {coordinates: string}];

const queryFunction = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyGeocoding>) => {
  const {coordinates: coordinatesQuery} = queryKey[1];

  const {data: response} = await axios.get(
    `${GEOCODER_ENDPOINT}?q=${coordinatesQuery}&key=${GEOCODER_KEY}&language=en&pretty=1`,
  );

  if (response) {
    const {results} = response;

    const {suburb} = results[0] && results[0]?.components;
    const residential =
      (results[0] && results[0]?.components?.residential) || '';
    const formattedAddress = results[0]?.formatted;
    const geocodedAddress = `${suburb},${residential}${formattedAddress}`;
    return geocodedAddress;
  }
};

const useGeocodingQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyGeocoding[1] & {options?: any}) => {
  const queryKey: QueryKeyGeocoding = ['Geocoding', {...queryKeyParams}];

  return useQuery(queryKey, queryFunction, options);
};

export {useGeocodingQuery};
