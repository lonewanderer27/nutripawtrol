import { useQuery } from "@tanstack/react-query"
import service from "../service"

const useSuggestLlm = (input: string, num: number) => {
    const query = useQuery({
        queryKey: ["suggest_llm"],
        queryFn: async () => {
            const res0 = await service.llm(input)
            const res = await service.suggest(num, res0.data.output)
            console.log("LLM: \n", res0.data)
            console.log("Suggest: \n", res.data)
            return {
                llm: res0.data.output,
                suggest: res.data.recommend
            }
        },
        enabled: false,
        refetchOnWindowFocus: false,
    })
    return query;
}

export default useSuggestLlm