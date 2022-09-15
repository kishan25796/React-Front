import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
	appBar: {
		top: "auto",
		bottom: 0,
	},
});

export default function AllQuestion(props) {
	const classes = useStyles();
	// const { setQuestionView, data, setShowView } = props;
	// const { studentEntries, name } = data;
	const name = "Studyroom";

	const studentEntries = [
		{ question: { questionText: "Hello Moto 1" } },
		{ question: { questionText: "Hello Moto 2" } },
		{ question: { questionText: "Hello Moto 3" } },
	];

	return (
		<>
			<Card className={classes.root} elevation={0}>
				<Box marginLeft={1} marginTop={1}>
					<Link
						onClick={() => {}}
						// onClick={() => setShowView("assignmentView")}
						style={{ color: "black" }}
					>
						<ArrowBackIcon />
					</Link>
				</Box>
				<CardContent>
					<Typography variant="body1" component={"span"}>
						<Box display="flex">
							<Box
								style={{
									backgroundColor: "#8867e7",
									color: "#ffffff",
									borderRadius: 2,
								}}
								alignContent="center"
								width={42}
								height={22}
								paddingLeft={1}
								paddingTop={1 / 3}
							>
								<Box fontSize={13} fontWeight={100}>
									10Abc
								</Box>
							</Box>
							<Box
								marginLeft={1}
								color="#8867e7"
								fontSize={14}
								fontWeight={700}
							>
								Maths
							</Box>
						</Box>
					</Typography>

					<Box marginTop={2} fontSize={18} fontWeight={700}>
						{" "}
						Chapter 1- {name}
					</Box>

					<Typography
						className={classes.title2}
						color="textPrimary"
						gutterBottom
						component={"span"}
					>
						<Box color="#989898">Due by June 1st, Mon</Box>
					</Typography>

					<Box marginTop={2} className={classes.root2}>
						<Box fontSize={12} color="#989898">
							1 of 8 answered
						</Box>
						<BorderLinearProgress
							style={{ maxWidth: 80 }}
							variant="determinate"
							value={33}
						/>
					</Box>

					<Box marginY={3}>
						<Divider />
					</Box>

					{studentEntries.map((questions, index) => (
						<Box fontSize={14} marginBottom={5}>
							<Box>
								<Box fontWeight={700} marginRight={1 / 2} display="inline">
									Q{index + 1}.
								</Box>
								{questions.question.questionText
									.replace(/(<([^>]+)>)/gi, "")
									.trim()}
							</Box>
						</Box>
					))}
				</CardContent>
				<AppBar
					position="fixed"
					style={{ color: "#ffffff", backgroundColor: "#2ed3cc" }}
					className={classes.appBar}
				>
					<Box
						paddingY={2}
						textAlign="center"
						onClick={() => {
							// setQuestionView("questionStart");
						}}
						fontWeight="fontWeightBold"
						color="#ffffff"
					>
						Start answering
					</Box>
				</AppBar>
			</Card>
		</>
	);
}
