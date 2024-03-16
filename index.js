let { PythonShell } = require("python-shell");

PythonShell.run("backend/chatbot/chatbot.py", options, (err, res) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log("message:", res);
  }
});
