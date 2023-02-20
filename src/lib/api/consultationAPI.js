import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../configs/axios";

export const useAddConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.post("/consultations", content), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["consultations"] }, { cancelRefetch: true });
		},
	});
};
export const useEditConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`/consultations/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["consultations"] }, { cancelRefetch: true });
		},
	});
};
export const useDeleteConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.delete(`/consultations/${content}`), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["consultations"] }, { cancelRefetch: true });
		},
	});
};
