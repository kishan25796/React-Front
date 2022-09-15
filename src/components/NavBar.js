import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@material-ui/core";

export default function NavBar() {
	return (
		<Link to={"/"}>
			<Box display="flex">
				<img src="../../assets/logo1.png" alt="logo1" />
				<Box marginLeft={1 / 2} marginTop={1 / 2}>
					<img src="../../assets/logo2.png" alt="logo2" />
				</Box>
			</Box>
		</Link>
	);
}
