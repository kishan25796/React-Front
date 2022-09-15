import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles({
	root: {
		minWidth: 112,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 16,
		fontWeight: 700,
	},
	title2: {
		fontSize: 11,
		fontWeight: 700,
	},
	title3: {
		fontSize: 14,
		fontWeight: 700,
	},
	pos: {
		marginBottom: 4,
	},
	appBar: {
		top: "auto",
		bottom: 0,
	},
});

export default function ContactUs() {
	const classes = useStyles();
	return (
		<Box maxHeight={50}>
			<AppBar
				elevation={0}
				style={{ color: "#000000", backgroundColor: "#f6f7fa", maxHeight: 50 }}
				className={classes.appBar}
			>
				<Box
					display="flex"
					fontSize={12}
					justifyContent="center"
					textAlign="center"
				>
					<Box paddingY={2} fontWeight={100}>
						Please call
					</Box>
					<Box paddingY={2} paddingX={1 / 2} fontWeight={700}>
						+91-9838286587
					</Box>
					<Box paddingY={2} fontWeight={100}>
						for support
					</Box>
				</Box>
			</AppBar>
		</Box>
	);
}
