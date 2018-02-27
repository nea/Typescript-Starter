# Typescript Starter
A very simple and basic Typescript Starter boilerplate template based on npm.

## Features
* Just npm *(no gulp, grunt or others)*
* Compiles and watches Typescript sources
* Compiles and watches SCSS sources
* Includes css, js, png, jpg, gif and html sources
* Keeps the original file structure
* Includes browser-sync for a local setup
* *No browsersify, uglify, lint, testing etc. (at least for now)*

## Latest Versions
* 1.0.0
  * Initial starter boilerplate template

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

## Personal Note
*I don't know if this is very useful for a lot of people but I was looking for a very simple and basic Typescript Starter template without any grunt, gulp, browsersify, uglify etc. Those are all very sane and good systems and dependencies, but to just get started may overwhelm some people. Therefore, I created an absolute basic compiler/copy system to just get started. I hope this proves useful to you... with all its Bugs and Issues ;) If you like it you can give me a shout at [INsanityDesign][4] or let me know via this repository.*

  [1]: https://github.com/nea/Typescript-Starter/archive/master.zip
  [2]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  [3]: https://docs.npmjs.com/files/package.json
  [4]: https://insanitydesign.com
