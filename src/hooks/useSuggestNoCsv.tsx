import service from '../service'
import { useQuery } from '@tanstack/react-query'
import { LlmOutputType } from '../types'

const useSuggestNoCsv = (num: number, llmOutput: LlmOutputType[] = []) => {
  const query = useQuery({
    queryKey: ['suggestNoCsv', num, llmOutput],
    queryFn: async () => {
      const res = await service.suggestNoCsv(num, llmOutput)
      return res.data
    },
    refetchOnWindowFocus: false,
  })
  return query;
}

export default useSuggestNoCsv