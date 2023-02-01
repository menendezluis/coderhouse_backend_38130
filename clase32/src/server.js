import express from "express";
import cluster from "cluster";
import { cpus } from "os";

const PORT = parseInt(process.argv[2]) || 3000;

const modoCluster = process.argv[3] === "CLUSTER";

function isPrime(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length;
  console.log(`Numero de CPUs: ${numCPUs}`);
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      `worker ${worker.process.pid} died`,
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    const { max } = req.query;
    const primes = [];

    const maxNumber = !max ? Number(max) : 1000;
    for (let i = 0; i < maxNumber; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    res.send(primes);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
