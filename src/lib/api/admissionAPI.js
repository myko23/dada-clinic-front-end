import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../configs/axios";

export const useAddAdmissionsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.post("/admissions", content), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admissions"] }, { cancelRefetch: true });
		},
	});
};
export const useEditAdmissionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`/admissions/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admissions"] }, { cancelRefetch: true });
		},
	});
};
export const useDischargeAdmissionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`/admissions/discharge/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admissions"] }, { cancelRefetch: true });
		},
	});
};
export const useDeleteAdmissionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.delete(`/admissions/${content}`), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admissions"] }, { cancelRefetch: true });
		},
	});
};
