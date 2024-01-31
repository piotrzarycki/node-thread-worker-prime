'use strict';
import assert from 'assert';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import { generatePrimes, main } from './thread_worker.js';
import config from './config.js';

const reset = "\x1b[0m";
const log = {
  green: (text) => console.log("\x1b[32m" + text + reset),
};

(async () => {
  const syncPrimesData = [];
  generatePrimes(syncPrimesData, config.min, config.max, config.min);
  const threadPrimeResult = await main(config, __filename);

  assert.equal(threadPrimeResult.sort().join(','), syncPrimesData.sort().join(','));
  log.green("All tests passed!");
})();
