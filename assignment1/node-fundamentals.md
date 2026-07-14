# Node.js Fundamentals

## What is Node.js?
Node.js is an environment that let you run JavaScript outside the browser. It can run on your computer or on server.

## How does Node.js differ from running JavaScript in the browser?
JavaScript in the browser
    - can work with pages, and browser APIs
    - has dom access
    - uses V9 engine for Chrome, SpiderMonkey for Firefox
Node.js
    - can work with files, servers, command-line tools, and backend apis
    - no dom access
    - always uses V8 engine

## What is the V8 engine, and how does Node use it?
V8 engine is open-source JavaScript Engine by Google, which is the program that takes JS source code and executes it. Node embeds V8 as its JavaScript Engine without having its own JavaScript intepreter. 

## What are some key use cases for Node.js?
- Backend APIs
- Working with files
- Web servers
- Streaming Applications

## Explain the difference between CommonJS and ES Modules. Give a code example of each.
CommonJS and ES Modules are module systems that allow you to separate files and share code.

CommonJS 
- syntax: require() 
- loading: synchronous (require() blocks until the module is loaded)
- origin: Node's original module system (Node-specific)
- file extension: .js

ES Modules
- syntax: import / export
- loading: asynchronous
- origin: official JS language spec (works in browsers and Node)
- file extension: .mjs or .js


**CommonJS (default in Node.js):**
```js

// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); 

```

**ES Modules (supported in modern Node.js):**
```js


// math.mjs
export function add(a, b) {
  return a + b;
}


// app.mjs
import { add } from './math.mjs';
console.log(add(2, 3)); 

``` 