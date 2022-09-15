import firebase from "./firebase";
import "firebase/auth";
import { Config } from "./config/config";

export const signInWithNumber = (
	number,
	recaptcha,
	setAuthFunction,
	setOtpScreen,
	setOpenLoading,
	setShowNumberError
) => {
	firebase
		.auth()
		.signInWithPhoneNumber(number, recaptcha)
		.then(function (e) {
			setOpenLoading(false);
			setAuthFunction(e);
			setOtpScreen(true);
		})
		.catch(function (error) {
			setOpenLoading(false);
			setShowNumberError(true);
			return;
		});
};

export const handleClick = (
	values,
	setOtpScreen,
	setAuthFunction,
	setOpenLoading,
	setShowNumberError
) => {
	/* Re-Captcha verification is mandatory for firebase OTP authentication */

	let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
		size: "invisible",
	});

	let number = "+91" + values.number;

	if (values.number === "") {
		setOpenLoading(false);
		setShowNumberError(true);
		return;
	}
	signInWithNumber(
		number,
		recaptcha,
		setAuthFunction,
		setOtpScreen,
		setOpenLoading,
		setShowNumberError
	);
};

export const handleOtpSubmit = (
	values,
	authFunction,
	history,
	setOpenLoading,
	setShowOTPError
) => {
	authFunction
		.confirm(values.code)
		.then(function (result) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					deviceType: "WEB",
					userType: "STUDENT",
					phone: values.number,
				}),
			};
			fetch(`${Config.baseUrl}/user`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem("auth_token", data.jwtToken);
					localStorage.setItem("userId", data.userId);

					fetch(`${Config.baseUrl}/diff/user/${data.userId}`)
						.then((response) => response.json())
						.then((data) => {
							setOpenLoading(false);
							if (data.userProperties.length === 0) {
								document.location.href = "/fullName";
							} else if (
								data.userProperties.filter(
									(prop) => prop.key === "join_class_flow_complete"
								).length >= 1
							) {
								document.location.href = "/assignmentContainer";
							} else if (
								data.userProperties.filter(
									(prop) => prop.key === "onboarding_flow_complete"
								).length >= 1
							) {
								document.location.href = "/joinClassContainer";
							} else {
								document.location.href = "/fullName";
							}
						});
				});
		})
		.catch(function (error) {
			setOpenLoading(false);
			setShowOTPError(true);
			return;
		});
};
