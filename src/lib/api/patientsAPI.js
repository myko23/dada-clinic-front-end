import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../configs/axios";

export const useAddPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.post("/patients", content), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};
export const useEditPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`/patients/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};
export const useDeletePatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.delete(`/patients/${content}`), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};
