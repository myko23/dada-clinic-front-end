import { useQueryClient } from "@tanstack/react-query";

export const useFetchQuery = (key) => {
	const queryClient = useQueryClient();

	return queryClient.getQueryData(key);
};
