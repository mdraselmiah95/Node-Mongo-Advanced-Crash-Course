const { errorHandler, funk } = require("./errorHandler.js");

async function getData() {
  try {
    // undefined.find();
    const emailError = new Error("Email Error ⛑️");
    throw emailError;
  } catch (error) {
    errorHandler(error);
  }
}

getData();
funk();
console.log("DONE");
