const elementExists = (id) => document.getElementById(id) !== null;

elementExists("crear") &&
  document.getElementById("crear").addEventListener("crear", (e) => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    fetch("/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
