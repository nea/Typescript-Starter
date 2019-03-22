/**
 * A library of functions for strict convertion to primitive values
 */
'use strict';
/**
 * Evaluate a value and convert it to either a finite number or null.
 */
function numberify(src) {
    function __toFinite(v) {
        switch (typeof v) {
            case 'number':
                // Use isFinite() instead of Number.isFinite() to target GAS
                return isFinite(v) ? v : null;
            case 'string':
                // parseFloat() is not used because it can return inaccurate result
                // e.g. Number.parseFloat('1.2a') returns 1.2
                v = Number(v);
                return isNaN(v) ? null : v;
            case 'boolean':
                return v ? 1 : 0;
            default:
                return null;
        }
    }
    if (typeof src === 'function') {
        src = src();
    }
    if ((src === null) || (src === undefined))
        return null;
    if (typeof src === 'object') {
        var objectValue = null;
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
/**
 * Evaluate a value and convert it to either a boolean or null. Return `true`
 * if the value evaluates to 1, "1", or true. Conversely, return `false`
 * if the value evaluates to 0, "0", or false. Otherwise, return `null`
 * (either true or false)..
 */
function booleanify(src) {
    function __booleanify(v) {
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
    if (typeof src === 'function') {
        src = src();
    }
    if ((src === null) || (src === undefined))
        return null;
    if (typeof src === 'object') {
        var objectValue = null;
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
/** Evaluate a value and convert it to either a string or null */
function stringify(src) {
    function __stringify(v) {
        switch (typeof v) {
            case 'number':
                return isFinite(v) ? String(v) : null; // Do not convert Infinity or NaN
            case 'string':
                return v;
            case 'boolean':
                return v ? "1" : "0";
            default:
                return null;
        }
    }
    if (typeof src === 'function') {
        src = src();
    }
    if ((src === null) || (src === undefined))
        return null;
    if (typeof src === 'object') {
        var objectValue = null;
        var objectString = null;
        if (typeof src.valueOf === 'function') {
            objectValue = src.valueOf();
        }
        if (typeof src.stringify === 'function') {
            objectString = src.stringify();
            if (objectString === '[object Object]')
                objectString = null;
        }
        // valueOf() takes precedence unless stringify() is a string
        if (typeof objectString === 'string')
            return objectString;
        if ((objectValue !== null) && (objectValue !== undefined)) {
            return __stringify(objectValue);
        }
        return __stringify(objectString);
    }
    return __stringify(src);
}
