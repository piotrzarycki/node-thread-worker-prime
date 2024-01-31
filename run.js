import config from './config.js';
import { main } from './thread_worker.js';
import { fileURLToPath } from 'url';
import { log } from './log.js';

const __filename = fileURLToPath(import.meta.url);

main(config, __filename).then((result) => {
  console.log(result.primes.sort((a, b) => a - b).join(","));
  log.green(`Time taken: ${result.time}ms`);
  log.green(`Using ${result.threads} threads`);
});
