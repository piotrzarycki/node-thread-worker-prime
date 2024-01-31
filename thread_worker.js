"use strict";
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'worker_threads';

export function generatePrimes(primesArray, start, range, min) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primesArray.push(i);
    }
    isPrime = true;
  }
}


export async function main(config, filename) {
  return new Promise((resolve, reject) => {
    let primes = [];
    if (isMainThread) {
      const threadCount = config.threadCount;
      const threads = new Set();

      console.log(`Start ${threadCount} threads`);

      let start = config.min;

      for (let i = 0; i < threadCount - 1; i++) {
        const myStart = start;
        threads.add(
          new Worker(filename, {
            workerData: { start: myStart, range: config.range },
          }),
        );
        start += config.range;
      }

      threads.add(
        new Worker(filename, {
          workerData: {
            start,
            range: config.range,
          },
        }),
      );

      for (let worker of threads) {
        worker.on("error", reject);
        worker.on("exit", () => {
          threads.delete(worker);
          console.log(`exiting, ${threads.size} running`);

          if (threads.size === 0) {
            resolve(primes);
          }

        });
        worker.on("message", (msg) => {
          primes = primes.concat(msg);
        });
      }
    } else {
      generatePrimes(primes, workerData.start, workerData.range, config.min);
      parentPort.postMessage(primes);
    }
  });
}

