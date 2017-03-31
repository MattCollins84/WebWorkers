var wait = function(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

onmessage = function(e) {
    wait(5000);
    postMessage("done");
}