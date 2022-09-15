import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export const apiEndPoint = "http://localhost:8000";

export const fontTheme = createMuiTheme({
	typography: {
		fontFamily: "Quicksand",
		fontWeight: 500,
	},
});

export const inputTextFieldTheme = createMuiTheme({
	palette: {
		primary: { main: "#01d7ca" },
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeight: 500,
	},
});

export const useStyles = makeStyles(() =>
	createStyles({
		root: {
			// maxWidth: 800,
			width: "100%",
			marginTop: 20,
			height: "100%",
		},
		imageStyle: {
			maxWidth: 100,
		},
		media: {
			paddingTop: "56.25%", // 16:9
		},
		media2: {
			paddingTop: "100%", // 16:9
		},
		button: {
			textTransform: "none",
			fontSize: "13px",
		},
		appBar: {
			top: "auto",
			bottom: 0,
		},
	})
);
