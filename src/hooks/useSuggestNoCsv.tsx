import service from '../service'
import { useQuery } from '@tanstack/react-query'
import { LlmOutputType } from '../types'

const useSuggestNoCsv = (num: number, llmOutput: LlmOutputType[] = [], input: string) => {
  const query = useQuery({
    queryKey: ['suggestNoCsv', num, llmOutput],
    queryFn: async () => {
      const res = await service.suggestNoCsv(num, llmOutput)
      return res.data
    },
    enabled: !!llmOutput && llmOutput.length > 0 && input.length > 0,
    refetchOnWindowFocus: false,
  })
  return query;
}

export default useSuggestNoCsv