const url = require("url");
const http = require("http");

const server = http.createServer((req, res) => {
  const address_url = "http://localhost:4040/contact?name=rasel&country=bd";
  const parsed_url = url.parse(address_url, true);
  const queryObject = parsed_url.query;
  console.log(queryObject);
});

const PORT = 4040;
server.listen(PORT);
console.log(`Server is Running at ${PORT}`);
