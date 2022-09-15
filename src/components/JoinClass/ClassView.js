import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import {Config} from './../../config/config'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		top: "auto",
		bottom: 0,
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: "0 auto",
	},
}));

export default function ClassView(props) {
	const classes = useStyles();

	const { classData } = props;

	const data = JSON.parse(classData);

	const { students, teachers, classRoom } = data;
	const { classCode } = classRoom;

	const userId = localStorage.getItem("userId");

	return (
		<>
			<Typography className={classes.text} variant="h5">
				<Box
					style={{
						backgroundColor: "#2ed3cc",
						color: "#ffffff",
						borderRadius: 5,
					}}
					width={95}
					height={86}
					marginLeft={15}
					paddingTop={1}
				>
					<Box paddingTop={3} textAlign="center" fontWeight="fontWeightBold">
						{classCode.classCode}
					</Box>
				</Box>
			</Typography>
			<Typography className={classes.text} variant="h5" gutterBottom>
				<Box textAlign="center" fontWeight="fontWeightBold">
					We found your classroom!
				</Box>
			</Typography>
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
			<AppBar
				position="fixed"
				style={{ color: "#ffffff", backgroundColor: "#2ed3cc" }}
				className={classes.appBar}
			>
				<Box
					paddingY={2}
					textAlign="center"
					onClick={() => {
						const requestOptions = {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								classCode: classCode.classCode,
							}),
						};

						const requestOptions2 = {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								key: "join_class_flow_complete",
								value: 1,
							}),
						};
						fetch(
							`${Config.baseUrl}/user/${userId}/student`,
							requestOptions
						)
							.then((response) => response.json())
							.then((data) => {
								fetch(
									`${Config.baseUrl}/user/${userId}/property`,
									requestOptions2
								).then(
									(response) =>
										(document.location.href = "/assignmentContainer")
								);
							});
					}}
					fontWeight="fontWeightBold"
					color="#ffffff"
				>
					JOIN CLASSROOM
				</Box>
			</AppBar>
		</>
	);
}
