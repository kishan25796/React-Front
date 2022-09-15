import React, { useState } from "react";

import Question from "./Question";

export default function QuestionWrapper(props) {
	const { setShowView, data, dictionary } = props;
	const { studentEntries } = data;
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [toggleState, setToggleState] = useState(true);

	return (
		<Question
			key={currentQuestion}
			question={studentEntries[currentQuestion].question.questionText}
			options={studentEntries[currentQuestion].question.answers}
			questionIndex={currentQuestion}
			setCurrentQuestion={setCurrentQuestion}
			setShowView={setShowView}
			total={studentEntries.length}
			dictionary={dictionary}
			toggleState={toggleState}
			setToggleState={setToggleState}
			data={data}
		/>
	);
}
