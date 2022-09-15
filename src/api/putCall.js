// import axios from "axios";
// import CONFIG from "../config";

// export const putCall = async (path_url, payload) => {
// 	return axios
// 		.put(CONFIG.api_endpoint + path_url, payload, {
// 			headers: { "auth-token": localStorage.getItem("auth_token") },
// 		})
// 		.then((result) => {
// 			return result;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			return Promise.reject(error);
// 		});
// };

// const requestOptions = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//         deviceType: "WEB",
//         userType: "STUDENT",
//         phone: "9999999999",
//     }),
// };
// fetch("https://qa.studyroom.live/user", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//         localStorage.setItem("auth_token", data.jwtToken);
//         document.location.href = "/fullName";
//     });
