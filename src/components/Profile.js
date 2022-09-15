import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useStyles } from "../constants";

export default function Profile() {
	const classes = useStyles();

	return (
		<Box textAlign="center" justifyContent="center">
			<Box
				fontWeight="fontWeightBold"
				fontSize={25}
				marginTop={10}
				marginBottom={5}
			>
				Upload your picture
			</Box>
			<img
				width={130}
				height={130}
				src="../../assets/profile.png"
				alt="Student"
			/>
			<Box
				fontSize={12}
				textAlign="center"
				marginX={7}
				marginBottom={10}
				marginTop={1}
				color="#989898"
			>
				Putting up a picture will help your teacher identify you
			</Box>

			<input
				accept="image/*"
				type="file"
				id="contained-button-file"
				style={{ display: "none" }}
				hidden
			/>
			<label htmlFor="contained-button-file">
				<Button
					variant="contained"
					component="span"
					style={{
						backgroundColor: "#01d7ca",
						color: "#ffffff",
						padding: 12,
						paddingLeft: 100,
						paddingRight: 100,
					}}
					className={classes.button}
				>
					<Box fontSize={14}>UPLOAD</Box>
				</Button>
			</label>

			<Link to="/joinClassContainer" style={{ textDecoration: "none" }}>
				<Box
					textAlign="center"
					fontWeight="fontWeightBold"
					color="#989898"
					marginY={2}
					fontSize={14}
				>
					Skip
				</Box>
			</Link>
		</Box>
	);
}
