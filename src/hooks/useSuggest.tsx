import service from '../service'
import { useQuery } from '@tanstack/react-query'
import { LlmOutputType } from '../types'

const useSuggest = (num: number, llmOutput: LlmOutputType[] = [], input: string) => {
  const query = useQuery({
    queryKey: ['suggest', num, input, llmOutput],
    queryFn: async () => {
      const res = await service.suggest(num, llmOutput!)
      return res.data
    },
    refetchOnWindowFocus: false,
  })
  return query;
}

export default useSuggest