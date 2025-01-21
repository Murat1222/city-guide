import { useQuery } from '@tanstack/react-query';
import { getUrlObject } from '../Utils/Utils';

export const useAttractionsQuery = ({ page, limit, category, sortBy, order }) => {
  const urlObject = getUrlObject(
    'https://6734e04a5995834c8a9132b6.mockapi.io/attractions',
    page,
    limit,
    null,
    category,
    sortBy,
    order
  );

  return useQuery({
    queryKey: ['attractions', page, limit, category, sortBy, order],
    queryFn: async () => {
      const response = await fetch(urlObject);
      if (!response.ok) {
        throw new Error('Ошибка');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};