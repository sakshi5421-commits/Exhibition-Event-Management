const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Launching ExhiConnect Night Flea Market Platform...\n");

// 1. Start Backend Server
const backend = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, "backend"),
  shell: true,
  stdio: "pipe"
});

backend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[36m[Backend]\x1b[0m ${data}`);
});

backend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[Backend Error]\x1b[0m ${data}`);
});

// 2. Start Frontend Dev Server
const frontend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  shell: true,
  stdio: "pipe"
});

frontend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[35m[Frontend]\x1b[0m ${data}`);
});

frontend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[Frontend Error]\x1b[0m ${data}`);
});

// Graceful cleanup on CTRL+C
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping backend and frontend servers...");
  backend.kill();
  frontend.kill();
  process.exit();
});
