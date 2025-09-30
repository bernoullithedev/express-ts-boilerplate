import app, { initDB } from "./app";
import config from "config";

const serverPort = config.get("PORT") || 2711;
initDB().then(() => {
app.listen(serverPort, () => {
	console.log(
		`🚀 Server is up and running at http://localhost:${serverPort}. Access it to start using the application.`,
	);
})}).catch((error) => {
	console.error("Failed to initialize the database:", error);
	process.exit(1);
});
 