import service from './service'
import { useQuery } from '@tanstack/react-query'

const useNutriPawtrol = (search: string) => {
  const query = useQuery({
    queryKey: ['nutripawtrol', search],
    queryFn: async () => {
      const res = await service.get(search)
      return res.data
    },
    enabled: search.length > 0
  })
  return query;
}

export default useNutriPawtrol