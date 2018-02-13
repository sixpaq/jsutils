const { loopWhile } = require('deasync');

/**
 * Performs a series of tasks in parallel. When all tasks are
 * finished, the callback function is called.
 * 
 * @param {any} tasks Array of tasks
 * @param {number} max Maximum number of parallel tasks simultaneously
 * @param {any} callback (err, results)
 * @returns 
 */
async function parallel(tasks, max = -1, callback) {
  if (callback === undefined && typeof max === 'function') {
    callback = max;
    max = -1;
  }

  const errors = [];
  const results = [];
  const proms = [];
  let limit = 0;

  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];

    const prom = new Promise((resolve, reject) => {
      limit += 1;
      if (max > 0) {
        loopWhile(() => {
          return limit > max;
        });
      }
      task((err, result) => {
        if (err) {
          errors.push(err);
          limit -= 1;
          return resolve({ error: err });
        }
        results.push(result);
        limit -= 1;
        return resolve({ error: null, result: result });
      });
    });
    proms.push(prom);
  }

  await Promise.all(proms);
  if (callback === undefined) {
    if (errors.length) throw errors;
    return results;
  }
  return callback(errors, results);
}

module.exports = parallel;
