import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import Divider from "@material-ui/core/Divider";

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
});

export default function Assignment(props) {
	const classes = useStyles();

	const { chapter, setAssignment, setShowView, setVerify } = props;
	const {
		assignmentId,
		createdAt,
		dueDate,
		subject,
		name,
		totalQuestions,
		totalSubmission,
		questionInfo,
		grade,
		section,
		submissionDate,
	} = chapter;

	const progressValue = (totalSubmission / totalQuestions) * 100;

	const CreatedDate = new Date(createdAt);

	const submissionDateString =
		submissionDate !== 0 && String(new Date(submissionDate));

	const assignmentDueDate = String(
		new Date(CreatedDate.setDate(CreatedDate.getDate() + dueDate))
	);

	const todayDate = Date();
	console.log("Kushagra ", todayDate);

	const dueDays =
		parseInt(assignmentDueDate.slice(8, 10), 10) -
		parseInt(todayDate.slice(8, 10), 10);

	const isDueToday =
		parseInt(assignmentDueDate.slice(8, 10), 10) -
			parseInt(todayDate.slice(8, 10), 10) >
		0
			? false
			: true;

	return (
		<>
			<Box marginX={2} marginY={3}>
				<Box display="flex" textAlign="center" justifyContent="space-between">
					<Box display="Flex">
						<Box
							style={{
								backgroundColor: "#8867e7",
								color: "#ffffff",
								borderRadius: 2,
							}}
							alignContent="center"
							height={22}
							paddingX={1}
							paddingTop={1 / 3}
						>
							<Box fontSize={13} fontWeight={100}>
								{grade}
								{section}
							</Box>
						</Box>
						<Box
							marginLeft={1}
							marginTop={1 / 2}
							color="#8867e7"
							fontSize={14}
							fontWeight={700}
						>
							{subject}
						</Box>
					</Box>
					<Box>
						{submissionDate === 0 ? (
							<>
								{isDueToday ? (
									<Box
										style={{
											backgroundImage: `url(${"../../assets/redRibbon2.png"})`,
											width: 120,
											height: 18,
										}}
										marginTop={1 / 2}
										// marginLeft={13}
									>
										<Box
											paddingTop={1 / 4}
											paddingLeft={1 / 2}
											fontSize={10}
											fontWeight={700}
											color="#ff465c"
										>
											Due on {assignmentDueDate.slice(4, 10)},{" "}
											{assignmentDueDate.slice(0, 3)}
										</Box>
									</Box>
								) : (
									<Box
										style={{
											backgroundImage: `url(${"../../assets/greenRibbon2.png"})`,
											width: 120,
											height: 18,
										}}
										marginTop={1 / 3}
										marginLeft={13}
									>
										<Box
											paddingTop={1 / 4}
											paddingLeft={1 / 2}
											fontSize={10}
											fontWeight={700}
											color="#039700"
										>
											Due on {assignmentDueDate.slice(4, 10)},{" "}
											{assignmentDueDate.slice(0, 3)}
										</Box>
									</Box>
								)}{" "}
							</>
						) : (
							<Box color="#989898" paddingLeft={10} fontSize={12}>
								Submitted on{" "}
								{String(new Date(submissionDateString)).slice(0, 10)}{" "}
							</Box>
						)}
					</Box>
				</Box>

				<Box marginTop={2} fontSize={16} fontWeight={700}>
					{" "}
					Chapter {assignmentId} - {name}
				</Box>
				<Box fontSize={8} fontWeight={700} color="#989898">
					Excercise 1.2 . NCERT Mathematics
				</Box>
				<Box marginTop={3} fontSize={12} fontWeight={700} color="#8867e7">
					Questions: {questionInfo}
				</Box>

				<Box
					display="flex"
					textAlign="center"
					marginTop={1}
					justifyContent="space-between"
				>
					<Box className={classes.root2}>
						<Box fontSize={12} fontWeight={700} color="#989898">
							{totalSubmission} of {totalQuestions} answered
						</Box>
						<BorderLinearProgress variant="determinate" value={progressValue} />
					</Box>
					<Box className={classes.root} marginTop={1 / 2}>
						{submissionDate !== 0 || dueDays < 0 ? (
							<Box
								color="#989898"
								paddingLeft={12}
								onClick={() => {
									setAssignment(chapter);
									if (dueDays < 0) {
										setVerify(true);
										setShowView("showQuestions");
									} else setShowView("result");
								}}
								fontSize={12}
								fontWeight={700}
							>
								View details {">"}{" "}
							</Box>
						) : (
							<Box
								color="#989898"
								paddingLeft={10}
								onClick={() => {
									setAssignment(chapter);
									setVerify(false);
									setShowView("showQuestions");
								}}
								fontSize={12}
								fontWeight={700}
							>
								Start answering {">"}{" "}
							</Box>
						)}
					</Box>
				</Box>
			</Box>
			<Divider style={{ height: 8, backgroundColor: "#f7f7f7" }} />
		</>
	);
}
