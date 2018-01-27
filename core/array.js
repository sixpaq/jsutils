Array.prototype.firstOrNull = function () { return (this.length > 0) ? this[0] : null; };
Array.prototype.lastOrNull = function () { return (this.length > 0) ? this[this.length - 1] : null; };
