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

// const shell = require("shelljs");
// const fs = require("fs");

// // Check if the virtual environment exists
// const virtualEnvPath = "env";
// const virtualEnvExists = shell.test("-e", `${virtualEnvPath}/Scripts/activate`);

// if (!virtualEnvExists) {
//   // If not, create the virtual environment
//   console.log("Virtual environment not found. Creating...");

//   // Adjust the path and Python version as needed
//   shell.exec(`python3 -m venv ${virtualEnvPath}`);
//   console.log("Virtual environment created.");
// } else {
//   console.log("Virtual environment found.");

//   // Read the requirements.txt file
//   const requirementsPath = "./requirements.txt";
//   const requirements = fs
//     .readFileSync(requirementsPath, "utf8")
//     .split("\n")
//     .filter(Boolean);

//   // Check if required libraries are installed
//   const missingLibraries = requirements.filter((lib) => {
//     return (
//       shell.exec(`${virtualEnvPath}/Scripts/pip show ${lib}`, { silent: true })
//         .code !== 0
//     );
//   });

//   if (missingLibraries.length > 0) {
//     console.log(missingLibraries.join(" "));
//     console.log("Installing missing libraries...");
//     console.log(
//       `${virtualEnvPath}/Scripts/pip install ${missingLibraries.join(" ")}`
//     );
//     // Install missing libraries using pip
//     const installResult = shell.exec(
//       `${virtualEnvPath}/Scripts/pip install ${missingLibraries.join(" ")}`,
//       { silent: true }
//     );

//     if (installResult.code === 0) {
//       console.log("All missing libraries installed successfully.");
//     } else {
//       console.error(`Error installing missing libraries. ${installResult}`);
//       process.exit(1);
//     }
//   } else {
//     console.log("All required libraries are installed.");
//   }
// }