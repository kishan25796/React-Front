import React, { Component } from "react";
import {Config} from './../config/config'

export default class Uploader extends Component {
	state = {
		message: "",
	};

	getImage = (e) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			this.setState({ file });
		}
	};

	uploadFile = (e) => {
		e.preventDefault();
		const { file } = this.state;
		this.setState({ message: "Uploading..." });
		const contentType = file.type; // eg. image/jpeg or image/svg+xml
		console.log("Kushagra print filename", file);

		const generatePutUrl = `${Config.baseUrl}/s3Upload/${file.name}`;

		fetch(generatePutUrl)
			.then((response) => response.json())
			.then((data) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": contentType },
					body: file,
				};
				console.log("Kushagra print data", data);
				fetch(data.url, requestOptions)
					.then((response) => console.log("Kushagra", response))
					.then((data) => console.log("Kushagra print data", data));
			});
	};

	render() {
		return (
			<React.Fragment>
				<h1>Upload an image to AWS S3 bucket</h1>
				<input
					id="upload-image"
					type="file"
					accept="image/*"
					onChange={this.getImage}
				/>
				<p>{this.state.message}</p>
				<form onSubmit={this.uploadFile}>
					<button id="file-upload-button">Upload</button>
				</form>
			</React.Fragment>
		);
	}
}
