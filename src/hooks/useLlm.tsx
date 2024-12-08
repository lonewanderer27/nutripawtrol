import service from '../service'
import { useQuery } from '@tanstack/react-query'

const useLlm = (input: string) => {
  const query = useQuery({
    queryKey: ['llm', input],
    queryFn: async () => {
      const res = await service.llm(input)
      return res.data
    },
    enabled: input.length > 0
  })
  return query;
}

export default useLlm