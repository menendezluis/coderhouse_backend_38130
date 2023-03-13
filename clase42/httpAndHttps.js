const http = require("http");
const https = require("https");

const fs = require("fs");
const filePath = "./postshttps.json";

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
const URL = "https://jsonplaceholder.typicode.com/posts";
const options = {
  hostname: "jsonplaceholder.typicode.com",
  port: 443,
  path: "/posts",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
    fs.writeFile(filePath, d, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Los datos se han almacenado en ${filePath}`);
      }
    });
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
