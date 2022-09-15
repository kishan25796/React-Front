import React from "react";
import "./App.css";
import { getCall } from "./api/getCall";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Uploader from "./components/Uploader";
import FullName from "./components/FullName";
import JoinClass from "./components/JoinClass/ClassView";
import JoinClassContainer from "./components/JoinClass/JoinClassContainer";
import QuestionWrapper from "./components/Assignment/Questionnaire/QuestionWrapper";
import Submission from "./components/Assignment/Submission";
import Result from "./components/Assignment/Result";
import AssignmentContainer from "./components/Assignment/AssignmentContainer";
import QuestionVerify from "./components/Assignment/Questionnaire/QuestionVerify";
import SubjectView from "./components/Assignment/SubjectView";
import AllQuestion from "./components/Assignment/Questionnaire/AllQuestion";
import Loading from "./components/Loading";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { fontTheme } from "./constants";

function App() {
	getCall("/hw/")

	const loggedIn = localStorage.getItem("auth_token");
	return (
		<Router>
			<Switch>
				<>
					<MuiThemeProvider theme={fontTheme}>
						{/* {!loggedIn && <Redirect to="/" />} */}
						{/* <Route
							path="/"
							exact
							render={() =>
								loggedIn ? (
									<Redirect to="/assignmentContainer" />
								) : (
									<Redirect to="/home" />
								)
							}
						/> */}
						<Route path="/" exact render={() => <Home />} />
						<Route path="/home" exact render={() => <Home />} />
						<Route path="/login" exact render={() => <Login />} />
						<Route path="/profile" exact render={() => <Profile />} />
						<Route path="/uploader" exact render={() => <Uploader />} />
						<Route path="/fullName" exact render={() => <FullName />} />
						<Route path="/joinClass" exact render={() => <JoinClass />} />
						<Route path="/submission" exact render={() => <Submission />} />
						<Route path="/result" exact render={() => <Result />} />
						<Route path="/loading" exact render={() => <Loading />} />
						<Route
							path="/assignmentContainer"
							exact
							render={() => <AssignmentContainer />}
						/>
						<Route path="/subjectView" exact render={() => <SubjectView />} />
						<Route
							path="/joinClassContainer"
							exact
							render={() => <JoinClassContainer />}
						/>
						<Route
							path="/questionVerify"
							exact
							render={() => <QuestionVerify />}
						/>
						<Route
							path="/questionWrapper"
							exact
							render={() => <QuestionWrapper />}
						/>
						<Route path="/allQuestion" exact render={() => <AllQuestion />} />
					</MuiThemeProvider>
				</>
			</Switch>
		</Router>
	);
}

export default App;
