import service from '../service'
import { useQuery } from '@tanstack/react-query'

const useLlm = (input: string) => {
  const query = useQuery({
    queryKey: ['llm'],
    queryFn: async () => {
      const res = await service.llm(input)
      return res.data ?? []
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
  return query;
}

export default useLlm