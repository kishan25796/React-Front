import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";

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

export default function QuestionVerify(props) {
	const classes = useStyles();

	const { data, name, setShowView } = props;
	const { grade, studentEntries, section, subject } = data;
	const totalCorrect = studentEntries.filter(
		(student) => student.correct === true
	).length;
	const totalUnAttempted = studentEntries.filter(
		(student) => student.answer === null
	).length;
	const totalIncorrect =
		studentEntries.length - totalCorrect - totalUnAttempted;

	return (
		<Card className={classes.root} elevation={0}>
			<CardContent>
				<Box marginTop={1} onClick={() => setShowView("assignmentView")}>
					<ArrowBackIcon />
				</Box>
				<Typography variant="body1">
					<Box display="flex" marginY={1}>
						<Box
							style={{
								backgroundColor: "#e3b672",
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
								{grade}
								{section}
							</Box>
						</Box>
						<Box marginLeft={1} color="#e3b672" fontSize={14} fontWeight={700}>
							{subject}
						</Box>
					</Box>
				</Typography>
				<Typography className={classes.title} color="textPrimary" gutterBottom>
					<Box marginY={1}> Chapter 1 - {name} </Box>
				</Typography>
				<Typography className={classes.title2} color="textPrimary" gutterBottom>
					<Box color="#989898">Due by June 1st, Mon</Box>
				</Typography>
				<Box display="flex" marginY={3}>
					<Box
						style={{
							backgroundColor: "#eefaf4",
							color: "#ffffff",
							borderTopWidth: 100,
							borderRadius: 3,
						}}
						width={170}
						height={40}
						paddingLeft={1}
					>
						<Box fontSize={28} paddingLeft={3} fontWeight={700} color="#039700">
							{totalCorrect}
						</Box>
					</Box>
					<Box
						style={{
							backgroundColor: "#ffcdd3",
							color: "#ffffff",
							borderTopWidth: 100,
							borderRadius: 3,
						}}
						width={170}
						height={40}
						paddingLeft={1}
						marginLeft={5}
						marginRight={5}
					>
						<Box fontSize={28} paddingLeft={3} fontWeight={700} color="#ff465c">
							{totalIncorrect}
						</Box>
					</Box>
					<Box
						style={{
							backgroundColor: "#e8e8e8",
							color: "#ffffff",
							borderTopWidth: 100,
							borderRadius: 3,
						}}
						width={170}
						height={40}
						paddingLeft={1}
					>
						<Box
							fontSize={28}
							paddingLeft={5 / 2}
							fontWeight={700}
							color="#989898"
						>
							{totalUnAttempted}
						</Box>
					</Box>
				</Box>

				{studentEntries.map((questionContent, index) => (
					<Box display="flex">
						<Typography variant="h5" color="textPrimary" component={"span"}>
							<Box fontSize={16}>
								<Box>
									<Box fontWeight={700} marginRight={1 / 2} display="inline">
										Q{index + 1}.
									</Box>
									{questionContent.question.questionText
										.replace(/(<([^>]+)>)/gi, "")
										.trim()}
								</Box>
							</Box>
							<Box
								style={{
									backgroundColor: "#eefaf4",
									color: "#ffffff",
									borderTopWidth: 100,
									borderRadius: 7,
								}}
								height={20}
								paddingLeft={1}
								paddingY={1}
								marginY={2}
							>
								<Box fontSize={13} bord fontWeight={700} color="#039700">
									Answer: {questionContent.answer}
								</Box>
							</Box>
						</Typography>
						<img
							width={25}
							height={25}
							mode="fit"
							src={
								questionContent.correct
									? "../../assets/correct.png"
									: "../../assets/wrong.png"
							}
							alt="Smiley face"
						/>
					</Box>
				))}
			</CardContent>
		</Card>
	);
}
