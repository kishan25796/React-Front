import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button } from "@material-ui/core";

import LinearProgress from "@material-ui/core/LinearProgress";
import {Config} from './../../../config/config'

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 8,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "#18d99f",
	},
}))(LinearProgress);

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

export default function ConfirmationModal(props) {
	const classes = useStyles();

	const { open, setOpen, dictionary, data, setShowView } = props;
	const { studentEntries, assignmentId } = data;
	const submissions = [];
	const userId = localStorage.getItem("userId");

	Object.values(dictionary).map(
		(answer, index) =>
			answer !== -1 &&
			submissions.push({
				assignmentContentId: studentEntries[index].assignmentContentId,
				answer: studentEntries[index].question.answers[answer],
				correct:
					studentEntries[index].question.answers[answer] ===
					studentEntries[index].question.correctAnswer,
			})
	);

	const answers = Object.values(dictionary);
	const totalQuestions = answers.length;
	const totalUnAttempted = answers.filter((ans) => ans === -1).length;
	const totalAttempted = totalQuestions - totalUnAttempted;
	const progressValue = (totalAttempted / totalQuestions) * 100;

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				// aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Box fontSize={15} fontWeight={700}>
							Are you sure you want to submit?
						</Box>
						<Box className={classes.root2} marginTop={2}>
							<Box
								fontSize={11}
								fontWeight={700}
								color="#989898"
								textAlign="center"
								marginBottom={1 / 2}
							>
								{totalAttempted} of {totalQuestions} answered
							</Box>
							<BorderLinearProgress
								variant="determinate"
								value={progressValue}
							/>
						</Box>
						<Box display="flex" marginTop={3} justifyContent="center">
							<Button
								variant="outlined"
								style={{
									backgroundColor: "#ffffff",
									color: "#989898",
									marginRight: 4,
								}}
								className={classes.button}
								onClick={handleClose}
							>
								<Box
									style={{ padding: 3, paddingLeft: 18, paddingRight: 18 }}
									fontSize={12}
								>
									CANCEL
								</Box>
							</Button>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#01d7ca",
									color: "#ffffff",
									marginLeft: 4,
								}}
								className={classes.button}
								onClick={() => {
									const requestOptions = {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({
											userId: userId,
											assignmentId: assignmentId,
											submissions: submissions,
										}),
									};
									fetch(
										`${Config.baseUrl}/user/${userId}/assignment/${assignmentId}/submission`,
										requestOptions
									).then((response) => {
										setShowView("submission");
									});
								}}
							>
								<Box
									style={{ padding: 3, paddingLeft: 18, paddingRight: 18 }}
									fontSize={12}
								>
									SUBMIT
								</Box>
							</Button>
						</Box>
					</div>
				</Fade>
			</Modal>
		</>
	);
}
