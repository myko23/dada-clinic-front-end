import { useMutation } from "@tanstack/react-query";
import API from "../configs/axios";

export const useLoginMutation = () => {
	return useMutation((content) => API.post("/users/login", content));
};
