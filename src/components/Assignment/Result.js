import React from "react";
// import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useStyles } from "../../constants";
// import { getCall } from "../api/getCall";

export default function Result(props) {
	const classes = useStyles();

	const { setShowView } = props;

	// const [image, setImage] = useState({ preview: "", raw: "" });

	return (
		<Grid container>
			<Grid container justify="center" alignItems="center">
				<Card className={classes.root} elevation={0}>
					<CardContent>
						<Grid container justify="center" alignItems="center">
							<Box marginTop={10}>
								<img
									width={65}
									height={90}
									mode="fit"
									src="../../assets/group.png"
									alt="Smiley face"
								/>
							</Box>
						</Grid>
						<Typography variant="h5" component={"span"}>
							<Box
								textAlign="center"
								marginX={2}
								color="#ff465c"
								fontWeight={700}
								fontSize={28}
							>
								Hold on !!
							</Box>
						</Typography>

						<Typography variant="body1" component={"span"}>
							<Box
								textAlign="center"
								marginX={2}
								marginBottom={4}
								fontWeight={700}
							>
								Your result will be out on the due date
							</Box>
						</Typography>
						<Grid item container justify="center" alignItems="center">
							<div>
								<Button
									variant="contained"
									component="span"
									style={{
										backgroundColor: "#01d7ca",
										color: "#ffffff",
										padding: 12,
										paddingLeft: 60,
										paddingRight: 60,
										fontSize: 15,
									}}
									className={classes.button}
									onClick={() => setShowView("assignmentView")}
								>
									<Box fontWeight="fontWeightBold">GO TO HOMESCREEN</Box>
								</Button>
							</div>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
