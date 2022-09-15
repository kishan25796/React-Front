import React, { useState, useEffect } from "react";

import AllQuestion from "./AllQuestion";
import QuestionWrapper from "./QuestionWrapper";
import QuestionVerify from "./QuestionVerify";
import { Config } from "./../../../config/config";

import Loading from "../../Loading";

export default function QuestionContainer(props) {
	const { setShowView, assignment, verify } = props;
	const initialViewType = verify ? "verifyQuestion" : "allQuestion";
	const assignmentId = 1;
	const name = "assignment name";
	// const { assignmentId, name } = assignment;
	const [questionView, setQuestionView] = useState(initialViewType);
	const [data, setData] = useState({});
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		// fetch(`${Config.baseUrl}/user/${userId}/assignment/${assignmentId}`)
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		setData(result);
		// 	})
		// 	.catch((e) => console.error(e));
	}, [assignmentId, userId]);

	if (Object.keys(data).length === 0) {
		return (
			<>
				<Loading openloading loadingMessage="Loading Questions" />
			</>
		);
	}

	const dictionary = {};
	data.studentEntries.map((question, index) => (dictionary[index] = -1));

	if (questionView === "allQuestion") {
		return (
			<AllQuestion
				setQuestionView={setQuestionView}
				setShowView={setShowView}
				data={data}
			/>
		);
	}

	if (questionView === "verifyQuestion") {
		return (
			<QuestionVerify
				setQuestionView={setQuestionView}
				setShowView={setShowView}
				data={data}
				name={name}
			/>
		);
	}

	if (questionView === "questionStart") {
		return (
			<QuestionWrapper
				dictionary={dictionary}
				setShowView={setShowView}
				data={data}
			/>
		);
	}

	return <></>;
}
