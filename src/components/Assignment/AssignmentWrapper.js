import React, { useEffect, useState } from "react";

import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { useStyles } from "../../constants";
import Assignment from "./Assignment";
import NavBar from "../NavBar";
import { Config } from "./../../config/config";

const colorMap = {
	Math: "#8867e7",
	Science: "#ef9b88",
	English: "#53a96b",
};

export default function AssignmentWrapper(props) {
	const { setAssignment, setShowView, setVerify, setSubject } = props;
	const classes = useStyles();
	const [chapters, setChapters] = useState([
		{
			assignmentId: 1,
			createdAt: "",
			dueDate: "",
			subject: "Chemistry",
			name: "Stoichiometry",
			totalQuestions: 10,
			totalSubmission: 1,
			questionInfo: "submitted",
			grade: "10",
			section: "A",
			submissionDate: "",
		},
		{
			assignmentId: 2,
			createdAt: "",
			dueDate: "",
			subject: "Chemistry",
			name: "Alkenes and alkynes",
			totalQuestions: 10,
			totalSubmission: 1,
			questionInfo: "submitted",
			grade: "10",
			section: "A",
			submissionDate: "",
		},
	]);
	const [subjects, setSubjects] = useState([]);

	// const userId = localStorage.getItem("userId");
	const userId = 1;

	useEffect(() => {
		// fetch(`${Config.baseUrl}/user/${userId}/assignment`)
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		// setChapters(result);
		// 	})
		// 	.catch((e) => console.error(e));
		// fetch(`https://qa.studyroom.live/diff/user/${userId}`)
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		setSubjects(
		// 			result.classRoomDetails.length !== 0 &&
		// 				result.classRoomDetails[0].subjects
		// 		);
		// 		// setChapters(result);
		// 	})
		// 	.catch((e) => console.error(e));
	}, [userId]);

	const uniqueSubjects = [];

	if (subjects.length !== 0) {
		subjects.map(
			(subject) =>
				!uniqueSubjects.includes(subject.name) &&
				uniqueSubjects.push(subject.name)
		);
	}

	return (
		<Box>
			<Box marginLeft={2} marginTop={1} marginBottom={1}>
				<NavBar />
			</Box>
			<Divider style={{ height: 2, backgroundColor: "#f7f7f7" }} />
			<Box display="flex" marginY={4} marginX={1}>
				{uniqueSubjects.map((subject) => (
					<Button
						variant="contained"
						style={{
							backgroundColor: `${
								Object.keys(colorMap).includes(subject)
									? colorMap[subject]
									: "#8867e7"
							}`,
							color: "#ffffff",
							padding: 8,
							marginLeft: 10,
						}}
						className={classes.button}
						onClick={() => {
							setSubject(subject);
							setShowView("subjectView");
						}}
						key={subject}
					>
						<Box fontWeight={700} fontSize={15}>
							{subject}
						</Box>
					</Button>
				))}
			</Box>
			<Box
				marginLeft={2}
				marginY={2}
				fontSize={25}
				color="#989898"
				fontWeight="fontWeightBold"
			>
				Homework
			</Box>
			<Divider
				variant="fullWidth"
				style={{ height: 8, backgroundColor: "#f7f7f7" }}
			/>
			{chapters.length === 0 ? (
				<>
					<Typography variant="body1" component={"span"}>
						<Box
							marginY={2}
							marginX={10}
							fontSize={15}
							textAlign="center"
							fontWeight="fontWeightBold"
							marginTop={6}
						>
							Homework is arriving in a bit
						</Box>
					</Typography>
					<Box textAlign="center">
						<img
							mode="fit"
							src="../../assets/emptyAssignment.png"
							alt="Smiley face"
						/>
					</Box>
				</>
			) : (
				chapters.map((chapter) => (
					<Assignment
						key={chapter.assignmentId}
						setAssignment={setAssignment}
						setShowView={setShowView}
						chapter={chapter}
						setVerify={setVerify}
					/>
				))
			)}
		</Box>
	);
}
