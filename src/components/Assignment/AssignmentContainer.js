import React, { useState } from "react";

import AssignmentWrapper from "./AssignmentWrapper";
import QuestionContainer from "./Questionnaire/QuestionContainer";
import Submission from "./Submission";
import Result from "./Result";
import SubjectView from "./SubjectView";

export default function AssignmentContainer() {
	const [showView, setShowView] = useState("assignmentView");
	const [assignment, setAssignment] = useState({});
	const [verify, setVerify] = useState(false);
	const [subject, setSubject] = useState("");

	if (showView === "assignmentView") {
		return (
			<AssignmentWrapper
				setShowView={setShowView}
				setAssignment={setAssignment}
				setVerify={setVerify}
				setSubject={setSubject}
			/>
		);
	}
	if (showView === "showQuestions") {
		return (
			<QuestionContainer
				setShowView={setShowView}
				assignment={assignment}
				verify={verify}
			/>
		);
	}
	if (showView === "submission") {
		return <Submission setShowView={setShowView} />;
	}
	if (showView === "result") {
		return <Result setShowView={setShowView} />;
	}

	if (showView === "subjectView") {
		return (
			<SubjectView
				subject={subject}
				setAssignment={setAssignment}
				setShowView={setShowView}
				setVerify={setVerify}
			/>
		);
	}
}
