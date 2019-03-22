# Conversely
A dependency-free, opinionated library of functions for evaluating an object and converting it to either a primitive or `null`.
Conversely is intended for use in data validation or similar applications.

## Features
* Works with function: `numberify( ()=> 1)` returns `1`.
* Works with object: `stringify( { v: 'A', valueOf: () => this.v;} )` returns `'A'`.
* Predictable and non-aggressive: `booleanify('false')` returns `null` instead of `true` or `false`

## Latest Versions
* 0.1.0
  * Initial commit

# Getting started
First clone this repository
```
git clone https://github.com/nea/Typescript-Starter.git <project_name>
```
or download the [zip][1] and extract it.

Change into the cloned/extracted directory and install the dependencies
```
npm install
```
  
## Usage
Start developing in the **src/** directory. The structure will be preserved and all files and compilations are copied to the output directory **bin/**.

To start a local server and watch the *bin/* directory just call
```
npm start
```

### Scripts
Watching all files
```
npm run watch:*
```

Build all files
```
npm build
```

Run a local server
```
npm run serve
```

## Configuration
You can check the *package.json* and *tsconfig.json* and alter them to your needs. For example, if you like to change the output directory, you would have to change all occurrences in these two files.

For more information check out the [tsconfig.json][2] and [package.json][3] documentation.

## Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

  [1]: https://github.com/nea/Typescript-Starter/archive/master.zip
  [2]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  [3]: https://docs.npmjs.com/files/package.json
