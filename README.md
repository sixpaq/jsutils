## Array extensions

### firstOrNull
This method is added to the Array prototype. This returns the first element
of an array or null if the array is empty.

#### Examples:
```
const myArray = [1, 2, 3];
console.log(myArray.firstOrNull()); // returns 1
```

```
const myArray = [];
console.log(myArray.firstOrNull()); // returns null;
```

### lastOrNull
This method is added to the Array prototype. This returns the last element
of an array or null if the array is empty.

#### Examples:
```
const myArray = [1, 2, 3];
console.log(myArray.lastOrNull()); // returns 3
```

```
const myArray = [];
console.log(myArray.lastOrNull()); // returns null;
```

## Future
This is a simple Future implementation based on deasync. This is an easy way
to turn an asynchronous process in to a synchronous process.

#### Example:
```
const f = new Future();

setTimeout(() => {
  if (somethingBadHappened) {
    f.throw(new Error('Bad'));
  }
  f.return(5);
}, 2000);

// Here we wait for the result (5), which will be placed in the output or an exception is thown.
const output = f.wait;
```

## parallel
Processes a list of functions in parallel and calls the callback when all functions
have finished or when an error occures.

#### Syntax:
parallel(tasks, max = -1, callback);

#### Example:
```
const tasks = [];
tasks.push((cb) => {
  // do something
  cb(null, 5);
});

tasks.push((cb) => {
  // do something
  cb(null, 3);
});

parallel(tasks, (err, 5, results) => {
  // contains is now [5, 3] unless an error occured.
});
```

## series
Processes a list of functions serial and calls the callback when all functions
have finished or when an error occures.

#### Syntax:
series(tasks, callback);

#### Example:
```
const tasks = [];
tasks.push((cb) => {
  // do something
  cb(null, 5);
});

tasks.push((cb) => {
  // do something
  cb(null, 3);
});

series(tasks, (err, results) => {
  // contains is now [5, 3] unless an error occured.
});
```
