'use strict';
import assert from 'assert';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import { generatePrimes, main } from './thread_worker.js';
import config from './config.js';
import { log } from './log.js';


(async () => {
  const syncPrimesData = [];
  generatePrimes(syncPrimesData, config.min, config.max, config.min);
  const threadPrimeResult = await main(config, __filename);

  assert.equal(threadPrimeResult.primes.sort().join(','), syncPrimesData.sort().join(','));
  log.green("All tests passed!");
})();
