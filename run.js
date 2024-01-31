import config from './config.js';
import { main } from './thread_worker.js';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __filename = fileURLToPath(import.meta.url);
const start = performance.now();

main(config, __filename).then((primes) => {
  const end = performance.now();
  console.log(primes.sort().join(","));
  console.log(`Execution time: ${end - start} ms`);
});
