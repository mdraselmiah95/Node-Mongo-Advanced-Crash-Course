const other = require("./other");
// const http = require("http");
// const _ = require("underscore");

// console.log(add(10, 5));

// const server = http.createServer((req, res) => {
//   //   console.log("server is running");
// });

// // server.listen(5000);

// var data = [
//   { name: "Rasel", age: 38 },
//   { name: "Shakib", age: 39 },
//   { name: "Tamim", age: 43 },
// ];

// const result = _.pluck(data, "name");
// console.log(result);

const res1 = other.add(10, 15);
const res2 = other.subtract(35, 15);
console.log(res1);
console.log(res2);
