const _mode = process.env.REACT_APP_ENV || "development";
const isProd = _mode === "production";

export interface ClientConfig {
	baseUrl: string;
}

const prodConfig = {
	baseUrl: "https://prod.studyroomapp.live",
} as ClientConfig;
const devConfig = { baseUrl: "https://qa.studyroom.live" } as ClientConfig;

export const Config = isProd ? prodConfig : devConfig;
