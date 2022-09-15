import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ThemeProvider } from "@material-ui/styles";

import { inputTextFieldTheme, useStyles } from "../../constants";
import ContactUs from "../ContactUs";
import {Config} from './../../config/config'

export default function ClassCode(props) {
	const classes = useStyles();
	const [showError, setShowError] = useState(false);

	const { setClassData, setShowView } = props;

	return (
		<Formik
			initialValues={{ classCode: "" }}
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
					<>
						<Box marginTop={4} />

						<Link to="/fullName" style={{ color: "black" }}>
							<Box marginLeft={2}>
								<ArrowBackIcon />
							</Box>
						</Link>
						<>
							<Grid item container justify="center" alignItems="center">
								<Typography variant="h5" color="textPrimary" component={"span"}>
									<Box
										fontWeight="fontWeightBold"
										fontSize={25}
										textAlign="center"
									>
										Enter Classroom code
									</Box>
								</Typography>
							</Grid>

							<Box marginTop={10} marginBottom={15} textAlign="center">
								<ThemeProvider theme={inputTextFieldTheme}>
									<TextField
										name="classCode"
										id="classCode"
										label={
											<Box
												textAlign="center"
												fontWeight="fontWeightBold"
												color="#989898"
												marginLeft={4}
												fontSize={16}
											>
												Enter your class code
											</Box>
										}
										value={values.classCode}
										variant="outlined"
										inputProps={{
											maxLength: 20,
											style: {
												fontSize: 20,
												fontWeight: 600,
												marginLeft: 15,
												marginRight: 15,
											},
										}}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</ThemeProvider>
								{showError && (
									<Typography
										variant="body1"
										color="textPrimary"
										component={"span"}
									>
										<Box
											fontWeight="fontWeightBold"
											fontSize={12}
											textAlign="center"
											color="#ff465c"
											marginTop={1}
										>
											Contact your teacher for a valid classcode
										</Box>
									</Typography>
								)}
							</Box>

							<Grid item container justify="center" alignItems="center">
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
										fetch(
											`${Config.baseUrl}/classCode/${values.classCode}`
										)
											.then((response) => {
												if (response.status !== 200) {
													setShowError(true);
												} else {
													response.json().then((result) => {
														setClassData(JSON.stringify(result));
														setShowView("classView");
													});
												}
											})
											.catch((e) => console.error(e));
									}}
								>
									<Box paddingX={15 / 2} fontSize={14}>
										FIND CLASSROOM
									</Box>
								</Button>
							</Grid>
							<Box marginTop={10} />
							<ContactUs />
						</>
					</>
				</form>
			)}
		</Formik>
	);
}
