import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
	createStyles({
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			outline: "none",
			borderRadius: 5,
		},
	})
);

export default function Loading(props) {
	const { openloading, loadingMessage } = props;
	const classes = useStyles();

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				// aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openloading}
				// onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openloading}>
					<div className={classes.paper}>
						<Box display="flex">
							<CircularProgress value={50} style={{ color: "#2ed3cc" }} />{" "}
							<Box marginLeft={2} marginTop={3 / 2} fontSize={13}>
								{loadingMessage}
							</Box>
						</Box>
					</div>
				</Fade>
			</Modal>
		</>
	);
}
