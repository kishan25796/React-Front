import { apiEndPoint } from "../constants";

export const getCall = async (path_url) => {
	fetch(apiEndPoint + path_url)
		.then((response) => response.json())
		.then((result) => {console.log("kishan", result)})
		.catch((e) => console.error(e));
};
