import React, { useState } from "react";

import ClassCode from "./ClassCode";
import ClassView from "./ClassView";

export default function JoinClassContainer() {
	const [showView, setShowView] = useState("classCode");
	const [classData, setClassData] = useState("");

	if (showView === "classCode") {
		return <ClassCode setClassData={setClassData} setShowView={setShowView} />;
	}

	if (showView === "classView") {
		return <ClassView classData={classData} setShowView={setShowView} />;
	}
}
