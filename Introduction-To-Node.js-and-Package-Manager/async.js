const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // fs.readFile("data.txt", (err, data) => {
    //   if (err) {
    //     res.write("Failed to Read Data 💥");
    //     res.end();
    //   } else {
    //     res.write(data);
    //     res.end();
    //   }
    // });

    // const data = fs.readFileSync("data.txt");
    // res.write(data);
    // res.end();

    fs.writeFile("newData.txt", "HEllo NodeJS", (error) => {
      if (error) {
        res.write("Data Failed to write");
        res.end();
      } else {
        res.write("Data written successfully");
        res.end();
      }
    });
  }
});

const PORT = 4040;
server.listen(PORT);
console.log(`Server is Running at ${PORT}`);
