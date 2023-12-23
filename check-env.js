const shell = require("shelljs");

// Check if the virtual environment exists
const virtualEnvExists = shell.test("-e", "./env/Scripts/activate");

if (!virtualEnvExists) {
  // If not, create the virtual environment
  console.log("Virtual environment not found. Creating...");

  // Adjust the path and Python version as needed
  shell.exec("python3 -m venv env");
  console.log("Virtual environment created.");
} else {
  shell.exec("\".\\env\\Scripts\\activate\"");

  console.log("Virtual environment found.");
}
