import axios from "axios";
import { apiEndPoint } from "../constants";

export const postCall = async (path_url, payload) => {
	return axios
		.post(apiEndPoint + path_url, payload, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PATCH, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
			},
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.error(error);
			return Promise.reject(error);
		});
};
