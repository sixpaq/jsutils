const deasync = require('deasync');

module.exports = class Future {
  constructor() {
    this.processed = false;
  }

  reset() {
    this.processed = false;
    delete this.result;
    delete this.error;
    return this;
  }

  return(result) {
    this.processed = true;
    this.result = result;
  }

  throw(error) {
    this.processed = true;
    this.error = error;
  }

  wait() {
    deasync.loopWhile(() => !this.processed);
    if (this.error) throw this.error;
    return this.result;
  }
};
