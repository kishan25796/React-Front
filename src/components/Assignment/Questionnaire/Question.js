import React, { useState } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useStyles } from "../../../constants";
import ConfirmationModal from "./ConfirmationModal";

export default function Question(props) {
	const classes = useStyles();

	const {
		question,
		options,
		questionIndex,
		setCurrentQuestion,
		setShowView,
		total,
		dictionary,
		toggleState,
		setToggleState,
		data,
	} = props;

	const selectedIndex = -1;
	const [open, setOpen] = useState(false);

	return (
		<Grid container>
			<Link
				onClick={() =>
					questionIndex === 0
						? setShowView("assignmentView")
						: setCurrentQuestion(questionIndex - 1)
				}
				style={{ color: "black" }}
			>
				<ArrowBackIcon />
			</Link>

			<Grid container justify="center" alignItems="center" item>
				<Card className={classes.root} elevation={0}>
					<CardContent style={{ paddingTop: 4, paddingBottom: 63 }}>
						<Grid container item>
							<Grid item container>
								<Typography variant="h5" color="textPrimary" component={"span"}>
									<Box
										fontWeight="fontWeightBold"
										fontSize={18}
										color="#989898"
										marginBottom={1}
									>
										Q{questionIndex + 1}.
									</Box>
								</Typography>
								<Typography variant="h5" color="textPrimary" component={"span"}>
									<Box
										fontWeight="fontWeightBold"
										justify="center"
										alignItems="center"
										fontSize={17}
									>
										{question.replace(/(<([^>]+)>)/gi, "").trim()}
									</Box>
								</Typography>
							</Grid>
							<Box
								fontWeight="fontWeightBold"
								justify="center"
								alignItems="center"
								fontSize={14}
								style={{ color: "#989898" }}
								marginY={2}
							>
								Select an answer
							</Box>

							{options.map((option, index) => {
								return (
									<Button
										variant="outlined"
										size="large"
										key={index}
										values={index}
										name="number"
										style={{
											padding: 10,
											borderColor:
												dictionary[questionIndex] === index
													? "#01d7ca"
													: "#e8e8e8",
											borderWidth: dictionary[questionIndex] === index ? 2 : 1,
											marginTop: 4,
											marginBottom: 4,
											marginLeft: 4,
											marginRight: 4,
										}}
										className={classes.button}
										onClick={() => {
											dictionary[questionIndex] = index;
											setToggleState(!toggleState);
										}}
									>
										<Box
											minWidth={290}
											display="flex"
											textAlign="left"
											paddingY={1 / 2}
										>
											<Box
												fontSize={16}
												color="#989898"
												paddingLeft={1}
												paddingRight={1}
											>
												{String.fromCharCode(65 + index)}.
											</Box>
											<Box
												fontWeight={selectedIndex === index ? 700 : 300}
												fontSize={16}
											>
												{option}
											</Box>
										</Box>
									</Button>
								);
							})}

							{questionIndex + 1 !== total && (
								<Box
									fontWeight="fontWeightBold"
									fontSize={14}
									style={{ color: "#989898" }}
									marginY={2}
									onClick={() => {
										dictionary[questionIndex] = -1;
										setCurrentQuestion(questionIndex + 1);
									}}
								>
									Skip question
								</Box>
							)}
							<Grid item container justify="center" alignItems="center">
								<Box
									style={{
										color: "#ffffff",
										backgroundColor: "#01d7ca",
										borderRadius: 5,
									}}
									width={300}
								>
									{questionIndex + 1 === total ? (
										<Box
											paddingY={2}
											textAlign="center"
											fontWeight="fontWeightBold"
											color="#ffffff"
											onClick={() => {
												setOpen(true);
											}}
										>
											Review and Submit
										</Box>
									) : (
										<Box
											paddingY={2}
											textAlign="center"
											fontWeight="fontWeightBold"
											onClick={() => {
												setCurrentQuestion(questionIndex + 1);
											}}
										>
											NEXT ({questionIndex + 1} of {total})
										</Box>
									)}
								</Box>
								<ConfirmationModal
									open={open}
									setOpen={setOpen}
									dictionary={dictionary}
									data={data}
									setShowView={setShowView}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
