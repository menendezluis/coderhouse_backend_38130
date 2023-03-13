const axios = require("axios");

const URL = "https://jsonplaceholder.typicode.com/posts";

axios
  .get(URL)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
