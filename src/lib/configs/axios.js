import axios from "axios";

const API = axios.create({
	baseURL: "https://dada-clinic-back-end-production.up.railway.app",
});

export default API;
