# Conversely

***PROJECT IS WORK IN PROGRESS***

A lightweight, platform-independent library of functions for evaluating a
primitive, object, or function and converting it to either a primitive or
`null`. Conversely is intended for use in data validation or similar
applications where the source value needs to be defined dynamically.

## Features
* Works with function:
    `numberify( ()=> 1)` returns `1`.
* Works with object:
    `stringify( { v: 'A', valueOf: () => this.v;} )` returns `'A'`.
* Does not force the issue in conversion:
    `booleanify('false')` returns `null` instead of `true` or `false`
* Consistent error value:
    `stringify(Infinity)`, `numberify('1a')`, `booleanify(undefined)`
  all return `null` instead of `'Infinity'`, `NaN`,  or `false`.
* Ideal for data validation or application which requires conversion of
  dynamically defined values.
* Works with any modern browser, [Node.js](https://nodejs.org/),
  and [Google Apps Script](https://developers.google.com/apps-script/).

## Latest Versions
* ~~0.1.0~~
  * ~~Initial commit~~

## Getting started
First clone this repository
```
git clone https://github.com/dan1wang/Conversely.git <project_name>
```
or download the [zip][1] and extract it.

Change into the cloned/extracted directory and install the dependencies
```
npm install
```
  
## Usage

All examples below assume you are using Node.js. For using the library with
a browser, see [import](doc/import).

For primitive to primitive conversion:

```JavaScript
import { stringify, stringify, booleanify } from 'conversely';

numberify('1.1'); // returns 1.1
stringify(0.3); // returns '0.3'
booleanify(1); // returns true
```

### Intermediary Property
For object to primitive conversion:

```JavaScript
import { stringify } from 'conversely';

const person = {
  fName: 'John',
  lName: 'Doe',
  valueOf: function() { return this.fName + ' ' + this.lName; },
};

stringify(person); // returns 'John Doe'
```

### Dynamic Evaluation
For function to primitive conversion:

```JavaScript
import { booleanify } from 'conversely';

const TOSS_UP = function() {return (Math.random() < 0.5)?0:1;};

booleanify(TOSS_UP); // returns true or false randomly
```

The library also works with function returning an intermediary property object:
```JavaScript
const NOW = function() {return new Date() };
numberify(NOW); // returns 1553307233321 or something like that
```

# Configuration
You can check the *package.json* and *tsconfig.json* and alter them to your needs. For example, if you like to change the output directory, you would have to change all occurrences in these two files.

For more information check out the [tsconfig.json][2] and [package.json][3] documentation.

# Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

  [1]: https://github.com/dan1wang/Conversely/archive/master.zip
  [2]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  [3]: https://docs.npmjs.com/files/package.json
