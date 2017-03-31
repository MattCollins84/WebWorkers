# WebWorkers
Proof of concept for using WebWorkers

## What are Web Workers?
Essentially, they let you run JavaScript in a background thread. This means that you can pass off intensive work to a separate thread without blocking the main thread and slowing down your app.

[More Info](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## The Demo
This is a very simple demo to show the power of Web Workers.

### no-workers.html
`no-workers.html` has two columns - red and blue - each with an associated button. When you click a button we will synchronously wait for 5 seconds (simulating some intensive work) and then update the appropriate column to show the process is complete.

During these 5 seconds, if we try to click the other button nothing will happen until the first process is complete. No functions can be executed, the dom doesn't respond, our app is unresponsive. Once it is complete the second process will start up in the same way.

### workers.html
`workers.html` does exactly the same thing as above, except that we pass the "waiting" off to a Web Worker. The Worker will do this in the background and let the parent window know when the work is done, at which point we update the appropriate column.

In the meantime, we can click the other button to start yet another process in another Worker without affecting the responsiveness of the main application.

## The code
Check the files above for the full thing, but the Web Worker specific code is here.

````javascript
// worker.html
// create a worker, providing the script to execute
// post a message to the worker to kick off the process
// update the main app when a mesage is returned
var start = function(col) {
    var myWorker = new Worker('worker.js');
    myWorker.postMessage("go");
    myWorker.onmessage = function(e) {
        document.getElementById(col).innerText = "DONE";
    }
}
````

````javascript
// worker.js
// wait function
var wait = function(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

// message handler to kick off the process
// when done, post message back
onmessage = function(e) {
    wait(5000);
    postMessage("done");
}
````