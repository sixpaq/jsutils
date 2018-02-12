/**
 * Performs a series of tasks sequentially. When all tasks are
 * finished, the callback function is called.
 * 
 * @param {any} tasks 
 * @param {any} callback (err, results)
 * @returns 
 */
async function series(tasks, callback) {
  const results = [];
  const errors = [];
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

    try { await prom; }
    catch (err) {};
  }
  if (callback === undefined) {
    if (errors.length) throw errors;
    return results;
  }
  return callback(errors, results);
}

module.exports = series;
