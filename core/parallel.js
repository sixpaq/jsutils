/**
 * Performs a series of tasks in parallel. When all tasks are
 * finished, the callback function is called.
 * 
 * @param {any} tasks 
 * @param {any} callback (err, results)
 * @returns 
 */
async function parallel(tasks, callback) {
  const errors = [];
  const results = [];
  const proms = [];
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];

    const prom = new Promise((resolve, reject) => {
      task((err, result) => {
        if (err) {
          errors.push(err);
          return resolve({ error: err });
        }
        results.push(result);
        return resolve({ error: null, result: result });
      });
    });
    proms.push(prom);
  }

  await Promise.all(proms);
  return callback(errors, results);
}

module.exports = parallel;
