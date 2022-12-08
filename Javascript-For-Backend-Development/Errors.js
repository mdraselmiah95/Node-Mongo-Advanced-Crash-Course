async function getData() {
  try {
    undefined.find();
  } catch (error) {}
}

getData();

function errorHandler(error) {
  const { name, message, stack } = error;

  logger.error({
    name,
    message,
    stack,
  });
  console.log("Internal Server Error.");
}

console.log("DONE");
