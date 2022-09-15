import React from "react";

import { Formik } from "formik";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";

import { inputTextFieldTheme, useStyles } from "../constants";
import ContactUs from "./ContactUs";
import { Config } from "./../config/config";

export default function FullName() {
	const classes = useStyles();
	const jwtToken = localStorage.getItem("auth_token");
	const userId = localStorage.getItem("userId");

	return (
		<Formik
			initialValues={{ fullName: "" }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<Box marginTop={11} justifyContent="center" textAlign="center">
						<Box fontWeight="fontWeightBold" fontSize={25}>
							Enter your name
						</Box>
						<Box marginTop={12} marginBottom={17} textAlign="center">
							<ThemeProvider theme={inputTextFieldTheme}>
								<TextField
									name="fullName"
									id="fullName"
									label={
										<Box
											fontWeight="fontWeightBold"
											color="#989898"
											marginLeft={10}
											fontSize={16}
										>
											Full name
										</Box>
									}
									value={values.fullName}
									variant="outlined"
									inputProps={{
										maxLength: 30,
										style: {
											fontSize: 20,
											fontWeight: 600,
											paddingLeft: 29,
											paddingRight: 29,
										},
									}}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</ThemeProvider>
						</Box>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#01d7ca",
								color: "#ffffff",
								padding: 12,
							}}
							className={classes.button}
							onClick={() => {
								const requestOptions = {
									method: "PUT",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										userId: userId,
										userName: values.fullName,
										userType: "STUDENT",
										profileImage: "",
										jwtToken: jwtToken,
									}),
								};

								const requestOptions2 = {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										key: "onboarding_flow_complete",
										value: 1,
									}),
								};
								fetch(`${Config.baseUrl}/user`, requestOptions).then(
									fetch(
										`${Config.baseUrl}/user/${userId}/property`,
										requestOptions2
									).then((response) => (window.location.href = "/profile"))
								);
							}}
						>
							<Box paddingX={13} fontSize={14}>
								NEXT
							</Box>
						</Button>
					</Box>
					<ContactUs />
				</form>
			)}
		</Formik>
	);
}
