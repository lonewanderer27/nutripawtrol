import service from '../service'
import { useQuery } from '@tanstack/react-query'
import { LlmOutputType } from '../types'

const useSuggest = (num: number, llmOutput: LlmOutputType) => {
  const query = useQuery({
    queryKey: ['suggest', num, llmOutput],
    queryFn: async () => {
      const res = await service.suggest(num, llmOutput)
      return res.data
    }
  })
  return query;
}

export default useSuggest