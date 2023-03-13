const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
};

//with axios
setInterval(() => {
  createRandomNumbet();
}, 2000);

async function createRandomNumbet() {
  try {
    const response = await axios.post("/ingreso", {
      randomNumber: generateRandomNumber(),
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteList() {
  try {
    const response = await axios.delete("/egreso");
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
//using got
setInterval(() => {
  deleteList();
}, 10000);
