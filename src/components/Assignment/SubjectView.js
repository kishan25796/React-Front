import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Loading from "../Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Assignment from "./Assignment";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`nav-tabpanel-${index}`}
			aria-labelledby={`nav-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		fontWeight: theme.typography.h1,
	},
	indicator: {
		backgroundColor: "#8867e7",
		height: 4,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SubjectView(props) {
	const { subject, setAssignment, setShowView, setVerify } = props;

	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [data, setData] = useState({});
	const userId = localStorage.getItem("userId");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		fetch(`https://qa.studyroom.live/diff/user/${userId}`)
			.then((response) => response.json())
			.then((result) => {
				setData(result);
			})
			.catch((e) => console.error(e));
	}, [userId]);

	console.log("Kushagra print data", data);

	if (Object.keys(data).length === 0) {
		return <Loading openloading loadingMessage="Loading Homework" />;
	}

	const { assignments, classRoomDetails } = data;

	const { classBooks, classRoom, students, teachers } = classRoomDetails[0];
	const { grade, section } = classRoom;
	const subjectAssignment = assignments.filter(
		(assignment) => assignment.subject === subject
	);
	const totalPeople = students.length + teachers.length;
	const subjectClassBooks = classBooks.filter(
		(book) => book.subject === subject.toLowerCase()
	);

	return (
		<Box>
			<Box marginTop={2} marginLeft={1}>
				<Link
					onClick={() => setShowView("assignmentView")}
					style={{ color: "black" }}
				>
					<ArrowBackIcon />
				</Link>
			</Box>

			<Box display="Flex" marginLeft={3} marginTop={2}>
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
					fontSize={12}
				>
					<Box fontSize={13} fontWeight={100}>
						{grade}
						{section}
					</Box>
				</Box>
				<Box
					marginX={2}
					fontWeight={700}
					fontSize={23}
					style={{ color: "#989898" }}
					marginBottom={2}
				>
					|
				</Box>
				<Box fontSize={18} fontWeight={700}>
					{subject}
				</Box>
			</Box>
			<Box className={classes.root} maxWidth={360} marginX={2}>
				<Tabs
					variant="fullWidth"
					value={value}
					onChange={handleChange}
					aria-label="icon tabs example"
					// textColor="primary"
					classes={{
						indicator: classes.indicator,
					}}
				>
					<Tab
						style={{
							fontWeight: 700,
							color: `${value === 0 ? "black" : "#989898"}`,
							fontSize: 12,
							paddingLeft: 0,
							paddingRight: 0,
						}}
						label="HOMEWORK"
					/>
					<Tab
						style={{
							fontWeight: 700,
							color: `${value === 1 ? "black" : "#989898"}`,
							fontSize: 12,
							paddingLeft: 0,
							paddingRight: 0,
						}}
						label={`PEOPLE (${totalPeople})`}
					/>
					<Tab
						style={{
							fontWeight: 700,
							color: `${value === 2 ? "black" : "#989898"}`,
							fontSize: 12,
						}}
						label="TEXTBOOKS"
					/>
				</Tabs>
				<TabPanel value={value} index={0}>
					{subjectAssignment.length === 0 ? (
						<>
							<Box
								marginTop={10}
								marginBottom={2}
								justifyContent="center"
								alignItems="center"
								textAlign="center"
							>
								<img src="../../assets/noHomeWork.png" alt="Student" />
							</Box>
							<Box fontSize={16} fontWeight={700} textAlign="center">
								No homeworks yet!! Come back soon
							</Box>
						</>
					) : (
						subjectAssignment.map((chapter) => (
							<Assignment
								key={chapter.assignmentId}
								setAssignment={setAssignment}
								setShowView={setShowView}
								chapter={chapter}
								setVerify={setVerify}
							/>
						))
					)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					<List className={classes.list}>
						<ListSubheader className={classes.subheader}>
							TEACHERS ({teachers.length})
						</ListSubheader>
						{teachers.map(({ userId, profileImage, userName, userType }) => (
							<div key={userId}>
								<ListItem button>
									<ListItemAvatar>
										<Avatar
											alt="Profile Picture"
											src={
												profileImage !== null
													? profileImage
													: "https://studyroom-profiles.s3.amazonaws.com/studyroom-profiles/1_1599767572927.jpg"
											}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={<Box fontWeight="fontWeightBold">{userName}</Box>}
										secondary={userType}
									/>
								</ListItem>
							</div>
						))}

						<Box key={userId} marginBottom={4}>
							<ListSubheader className={classes.subheader}>
								STUDENTS ({students.length})
							</ListSubheader>

							{students.map(({ userId, profileImage, userName, userType }) => (
								<ListItem button>
									<ListItemAvatar>
										<Avatar
											alt="Profile Picture"
											src={
												profileImage !== null
													? profileImage
													: "https://studyroom-profiles.s3.amazonaws.com/studyroom-profiles/1_1599767572927.jpg"
											}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={<Box fontWeight="fontWeightBold">{userName}</Box>}
										secondary={userType}
									/>
								</ListItem>
							))}
						</Box>
					</List>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<List className={classes.list}>
						{subjectClassBooks.map(
							({ grade, subject, bookId, bookName, bookImage }) => (
								<div key={userId}>
									<ListItem button>
										<ListItemText
											primary={
												<Box fontWeight="fontWeightBold">{bookName}</Box>
											}
											secondary={`CBSE - Grade ${grade} - ${subject}`}
										/>
									</ListItem>
								</div>
							)
						)}
					</List>
				</TabPanel>
			</Box>
		</Box>
	);
}
