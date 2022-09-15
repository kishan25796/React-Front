import React from "react";
import { Link } from "react-router-dom";

import CallIcon from "@material-ui/icons/Call";
import { Box, Button } from "@material-ui/core";

import NavBar from "./NavBar";
import { useStyles } from "../constants";

export default function Home() {
	const classes = useStyles();
	return (
		<Box textAlign="center" flex={1} minHeight={568}>
			<Box display="flex" justifyContent="center" marginTop={8}>
				<NavBar />
			</Box>
			<Box
				style={{
					lineHeight: 6 / 5,
				}}
				paddingX={6}
				fontSize={25}
				fontWeight="fontWeightBold"
				marginTop={11}
				marginBottom={5}
			>
				Sign in to your student account
			</Box>
			<img
				width={216}
				height={130}
				src="../../assets/students.png"
				alt="Student"
			/>
			<Box marginTop={15}>
				<Button
					variant="contained"
					style={{
						backgroundColor: "#01d7ca",
						color: "#ffffff",
						padding: 12,
						paddingLeft: 34,
						paddingRight: 34,
						fontSize: 14,
					}}
					className={classes.button}
					component={Link}
					to="/login"
				>
					<CallIcon style={{ height: 15, width: 15, paddingRight: 5 }} />
					Sign up with mobile number
				</Button>
			</Box>
		</Box>
	);
}
