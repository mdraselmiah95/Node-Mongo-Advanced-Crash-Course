function errorHandler(error) {
  const { name, message, stack } = error;
  console.log(name, message);

  //   logger.error({
  //     name,
  //     message,
  //     stack,
  //   });
  //   console.log("Internal Server Error.");
}

function funk() {
  console.log("TWO");
}

//module.exports = errorHandler;

// module.exports.errorHandler = errorHandler;
// module.exports.funk = funk;

module.exports = {
  errorHandler,
  funk,
};

// console.log(module);
