import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { Formik } from "formik";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ThemeProvider } from "@material-ui/styles";

import { inputTextFieldTheme, useStyles } from "../constants";
import { handleClick, handleOtpSubmit } from "../utils";
import OTPInput from "./OtpInput/otpindex";
import Loading from "./Loading";
import ContactUs from "./ContactUs";

export default function Login() {
	const history = useHistory();
	const classes = useStyles();
	const [otpScreen, setOtpScreen] = useState(false);
	const [authFunction, setAuthFunction] = useState(null);
	const [openloading, setOpenLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("");
	const [showNumberError, setShowNumberError] = useState(false);
	const [showOTPError, setShowOTPError] = useState(false);

	return (
		<Formik
			initialValues={{ number: "", code: "" }}
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
				setFieldValue,
			}) => (
				<form onSubmit={handleSubmit}>
					<Loading openloading={openloading} loadingMessage={loadingMessage} />

					<Box marginTop={2} marginLeft={1}>
						<Link to="/home" style={{ color: "black" }}>
							<ArrowBackIcon />
						</Link>
					</Box>
					<Box textAlign="center" justifyContent="center" marginTop={5}>
						{!otpScreen ? (
							<>
								<Box fontWeight="fontWeightBold" fontSize={25}>
									Enter phone number
								</Box>

								<Box
									fontWeight="fontWeightBold"
									fontSize={14}
									color="#989898"
									marginTop={1}
								>
									Even your parent's number will do!
								</Box>

								<Box marginTop={10} marginBottom={15} textAlign="center">
									<ThemeProvider theme={inputTextFieldTheme}>
										<TextField
											name="number"
											id="number"
											label={
												<Box
													textAlign="center"
													fontWeight="fontWeightBold"
													color="#989898"
													paddingLeft={7}
													fontSize={16}
												>
													Phone Number
												</Box>
											}
											value={values.number}
											variant="outlined"
											inputProps={{
												maxLength: 10,
												style: {
													fontSize: 16,
													marginLeft: 34,
													marginRight: 34,
													fontWeight: 600,
												},
											}}
											onInput={(e) => {
												e.target.value = e.target.value.replace(/[^0-9]/g, "");
											}}
											onChange={handleChange}
											onBlur={handleBlur}
											style={{ outlineColor: "#e8e8e8" }}
										/>
										{showNumberError && (
											<Box
												fontWeight="fontWeightBold"
												fontSize={12}
												textAlign="center"
												color="#ff465c"
												marginTop={5 / 4}
											>
												Invalid Phone number
											</Box>
										)}
									</ThemeProvider>
								</Box>

								<Button
									variant="contained"
									style={{
										backgroundColor: "#01d7ca",
										color: "#ffffff",
										padding: 12,
										paddingLeft: 14,
										paddingRight: 14,
									}}
									className={classes.button}
									onClick={() => {
										setLoadingMessage("Sending OTP");
										setOpenLoading(true);
										setShowNumberError(false);
										handleClick(
											values,
											setOtpScreen,
											setAuthFunction,
											setOpenLoading,
											setShowNumberError
										);
									}}
								>
									<Box paddingX={11} fontSize={14}>
										PROCEED
									</Box>
								</Button>
								<Box marginY={5 / 4} color="#989898" fontSize={12}>
									an OTP will be send for verification
								</Box>

								<Box marginTop={10} />
								<ContactUs />
							</>
						) : (
							<>
								<Box fontWeight="fontWeightBold" fontSize={25}>
									Enter OTP sent to
								</Box>

								<Box fontWeight="fontWeightBold" fontSize={16} color="#989898">
									+91-{values.number}
								</Box>

								<Box marginY={10} textAlign="center">
									<OTPInput
										length={6}
										className="otpContainer"
										inputClassName="otpInput"
										name="code"
										id="code"
										values={values.code}
										isNumberInput
										autoFocus
										onChangeOTP={(otp) => setFieldValue("code", otp)}
									/>
									{showOTPError && (
										<Box
											fontWeight="fontWeightBold"
											fontSize={12}
											textAlign="center"
											color="#ff465c"
											marginTop={5 / 4}
										>
											Invalid OTP
										</Box>
									)}
								</Box>

								<Button
									variant="contained"
									style={{
										backgroundColor: "#01d7ca",
										color: "#ffffff",
										padding: 12,
										paddingLeft: 14,
										paddingRight: 14,
									}}
									className={classes.button}
									onClick={() => {
										setLoadingMessage("Verifying OTP");
										setOpenLoading(true);
										handleOtpSubmit(
											values,
											authFunction,
											history,
											setOpenLoading,
											setShowOTPError
										);
									}}
								>
									<Box paddingX={11} fontSize={14}>
										VERIFY
									</Box>
								</Button>

								<Box marginTop={10} />
							</>
						)}
						<ContactUs />
					</Box>
				</form>
			)}
		</Formik>
	);
}
