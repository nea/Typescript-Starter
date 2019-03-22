/**
 * A library of functions for strict convertion to primitive values
 */

'use strict';

 /**
  * A parameterless function that returns a number.
  * @ignore
  * The following can be assigned to NumberFn:
  * ```
  * fn = () => Math.random();
  * fn = (n?:number) => (n===undefined)?1:n+1;
  * ```
  * The following cannot be assigned to NumberFn:
  * ```
  * fn = (n?:number) => (Number(n)>0); // returns a boolean
  * fn = (n:number) => n+1; // requires one parameter
  * ```
  */
type NumberFn = {():number};
/** A parameterless function that returns a string. See [[NumberFn]]. */
type StringFn = {():string};
/** A parameterless function that returns a boolean. See [[NumberFn]]. */
type BooleanFn = {():boolean};
/** A parameterless function that returns an object. See [[NumberFn]]. */
type ObjectFn = {():object};
/** A parameterless function that returns an array. See [[NumberFn]]. */
type ArrayFn = {():[]};

// Note: we can't actually test if a function is parameterless.
// We could check if foo.length === 0 if a function is written like
//    function foo(...args) {}
// or
//    function foo(x=null) {}
// However, default parameter and rest parameter are ES6 features
// and not well supported (e.g. in IE and GAS), and most functions
// aren't written that way anyway.

// tslint:disable:no-any
type AnyObj = {[key:string]:any;};
type ConvertibleFn = NumberFn|StringFn|BooleanFn|{():ConvertibleObj};
type ConvertibleObj =
  {valueOf:NumberFn|StringFn|BooleanFn}&AnyObj|
  {toString:NumberFn|StringFn|BooleanFn}&AnyObj;
// tslint:enable:no-any

// **********************************************************************
// ************************* Number Conversion  *************************
// **********************************************************************

/**
 * A function with a return value that may be convertible to a number.
 * A function is convertible if its return value is a number, a string
 * of a number, a boolean, or a [[NumberableObj]].
 */
type NumberableFn = ConvertibleFn;

/**
 * An object that may be convertible to a number. An object is convertible
 * if it has a valueOf() or toString() method that returns a number, a
 * string of a number, or a boolean.
 * Example:
 * ```
 * range = {min: 0, max: 5, valueOf: function() {return this.max-this.min;}};
 * ```
 */
type NumberableObj = ConvertibleObj;

/**
 * A number, string, boolean, object, or function that may be convertible to a number.
 */
type Numberable = number|string|boolean|NumberableFn|NumberableObj;

 /**
  * Strictly convert a string to either a finite number or null.
  * ```
  * numberify('2 '); // returns 2
  * numberify('2a'); // returns null
  * ```
  */
function numberify(src: string): number|null;

/**
 * Strictly convert a number to either a finite number or null.
 * ```
 * numberify(Math.PI); // returns 3.141592653589793
 * numberify(NaN); // returns null
 * numberify(Infinity); // returns null
 * ```
 */
function numberify(src: number): number|null;

/**
 * Strictly convert a boolean to 1 (true) or 0 (false).
 */
function numberify(src: boolean): number|null;

/**
 * Strictly convert an object to either a finite number or null. An object is
 * convertible if it has a `valueOf()` or `toString()` method that returns
 * a finite number, a string of a number, or a boolean.
 * ```
 * var range = {min: 0, max: 5};
 * numberify(range); // returns null
 * range.valueOf = function() {return this.max-this.min;};
 * numberify(range); // returns 5
 * ```
 */
function numberify(src: object): number|null;

/**
 * Execute a function and strictly convert the returned value to
 * either a finite number or null.
 * ```
 * var PI = function() {return Math.PI;};
 * var ONE = function() {return '1';};
 * var TRUE = function() {return true;};
 * var NOW = function() {return new Date();};
 * numberify(PI); // returns 3.141592653589793
 * numberify(ONE); // returns 1
 * numberify(TRUE); // returns 1
 * numberify(NOW); // returns (new Date()).valueOf(), which is a number
 * ```
 */
function numberify(src: Function): number|null;

 /**
  * Evaluate a value and convert it to either a finite number or null.
  */
function numberify(src: Numberable): number|null {

  function __toFinite(v: any): number|null { // tslint:disable-line:no-any
    switch (typeof v) {
      case 'number':
          // Use isFinite() instead of Number.isFinite() to target GAS
          return isFinite(v)?v:null;
      case 'string':
          // parseFloat() is not used because it can return inaccurate result
          // e.g. Number.parseFloat('1.2a') returns 1.2
          v = Number(v);
          return isNaN(v)?null:v;
      case 'boolean':
          return v?1:0;
      default:
          return null;
    }
  }

  if (typeof src === 'function') { src = (src as NumberableFn)(); }

  if ((src === null) || (src === undefined)) return null;

  if (typeof src === 'object') {
    let objectValue: number|null = null;

    if (typeof src.valueOf === 'function') {
      objectValue = __toFinite(src.valueOf());
    }

    if ((objectValue === null) && (typeof src.toString === 'function')) {
      objectValue = __toFinite(src.toString());
    }

    return objectValue;
  }

  return __toFinite(src);
}

// **********************************************************************
// ************************* Boolean Conversion *************************
// **********************************************************************

/**
 * A function with a return value that may be convertible to a boolean.
 * A function is convertible if its return value is 1, 0, "1", "0",
 * a boolean, or a [[BooleanableObj]].
 */
type BooleanableFn = ConvertibleFn;

/**
 * An object that may be convertible to a boolean. An object is convertible
 * if it has a valueOf() or toString() method that returns 1, 0, "1", "0", or
 * a boolean.
 * Example:
 * ```
 * equal = {a: 1, b: 2, valueOf: function() {return a==b}};
 * ```
 */
type BooleanableObj = ConvertibleObj;

/**
 * A number, string, boolean, object, or function that may be convertible to a boolean.
 */
type Booleanable = number|string|boolean|BooleanableFn|BooleanableObj;

/**
 * Strictly convert a string to either a boolean or null.
 * ```
 * booleanify('1'); // returns true
 * booleanify('0'); // returns false
 * booleanify('2'); // returns null
 * ```
 */
function booleanify(src: string): boolean|null;

/**
 * Strictly convert a number to either a boolean or null.
 * ```
 * booleanify(1); // returns true
 * booleanify(0); // returns false
 * booleanify(NaN); // returns null
 * ```
 */
function booleanify(src: number): boolean|null;

/**
 * Strictly convert a boolean to, well, a boolean.
 */
function booleanify(src: boolean): boolean;

/**
 * Strictly convert an object to either a boolean or null. An object is
 * convertible if it has a `valueOf()` or `toString()` method that
 * returns 1, 0, "1", "0", or a boolean.
 * ```
 * var equal = {a: 1, b: 2};
 * booleanify(equal); // returns null
 * equal.valueOf = function() {return this.a==this.b;};
 * booleanify(equal); // returns true
 * ```
 */
function booleanify(src: object): boolean|null;

/**
 * Execute a function and strictly convert the returned value to
 * either a boolean or null.
 * ```
 * var TOSS_UP = function() {return (Math.random() < 0.5)?0:1;};
 * var ONE = function() {return '1';};
 * var TRUE = function() {return true;};
 * booleanify(TOSS_UP); // returns true or false randomly
 * booleanify(ONE); // returns true
 * booleanify(TRUE); // returns true
 * ```
 */
function booleanify(src: Function): boolean|null;

/**
 * Evaluate a value and convert it to either a boolean or null. Return `true`
 * if the value evaluates to 1, "1", or true. Conversely, return `false`
 * if the value evaluates to 0, "0", or false. Otherwise, return `null`
 * (either true or false)..
 */
function booleanify(src: Booleanable): boolean|null {

  function __booleanify(v: any): boolean|null { // tslint:disable-line:no-any
    switch (v) {
      case "1":
      case 1:
      case true:
          return true;
      case "0":
      case 0:
      case false:
          return false;
      default:
          return null;
    }
  }

  if (typeof src === 'function') { src = (src as BooleanableFn)(); }

  if ((src === null) || (src === undefined)) return null;

  if (typeof src === 'object') {
    let objectValue: boolean|null = null;

    if (typeof src.valueOf === 'function') {
      objectValue = __booleanify(src.valueOf());
    }

    if ((objectValue === null) && (typeof src.toString === 'function')) {
      objectValue = __booleanify(src.toString());
    }

    return objectValue;
  }

  return __booleanify(src);
}

// **********************************************************************
// ************************* String Conversion  *************************
// **********************************************************************

/**
 * A function with a return value that may be convertible to a string.
 * A function is convertible if its return value is a finite number,
 * a string, a boolean, or a [[StringableObj]].
 */
type StringableFn = ConvertibleFn;

/**
 * An object that may be convertible to a string. An object is convertible
 * if it has a valueOf() or toString() method that returns a finite number,
 * a string that is not "[object Object]", or a boolean.
 * Example:
 * ```
 * person = {fName: 'John', lName: 'Doe', valueOf: function() {return this.fName + ' ' + this.lName;}};
 * ```
 */
type StringableObj = ConvertibleObj;

/**
 * A number, string, boolean, object, or function that may be convertible to a number.
 */
type Stringable = number|string|boolean|StringableFn|StringableObj;

/** Evaluate a value and convert it to either a string or null */
function stringify(src: Stringable): string|null {

  function __stringify(v: any): string|null { // tslint:disable-line:no-any
    switch (typeof v) {
      case 'number':
          return isFinite(v)?String(v):null; // Do not convert Infinity or NaN
      case 'string':
          return v;
      case 'boolean':
          return v?"1":"0";
      default:
          return null;
    }
  }

  if (typeof src === 'function') { src = (src as StringableFn)(); }

  if ((src === null) || (src === undefined)) return null;

  if (typeof src === 'object') {

    let objectValue: any = null;  // tslint:disable-line:no-any
    let objectString: any = null; // tslint:disable-line:no-any

    if (typeof src.valueOf === 'function') {
      objectValue = src.valueOf();
    }

    if (typeof src.stringify === 'function') {
      objectString = src.stringify();
      if (objectString === '[object Object]') objectString = null;
    }

    // valueOf() takes precedence unless stringify() is a string
    if (typeof objectString === 'string') return objectString;
    if ((objectValue !== null)&&(objectValue !== undefined)) {
      return __stringify(objectValue);
    }
    return __stringify(objectString);
  }

  return __stringify(src);
}
