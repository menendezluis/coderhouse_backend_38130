import autocannon from "autocannon";
import { PassThrough } from "stream";

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 10,
    duration: 5,
  });
  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => {
    buf.push(data);
  });
}

console.log("Running all enchmark");
run("http://localhost:3000/auth-bloq?username=dani&password=qwerty123");
run("http://localhost:3000/auth-nobloq?username=dani&password=qwerty123");
