/**
 * Created by Stuart on 11/5/14.
 */

nlpthreads = (function () {

    function xhr(req) {
        var xhreq = new XMLHttpRequest();
        xhreq.onload = function() {
            req.callback(xhreq);
        };
        xhreq.open(req.method, req.url, true);
        if (req.method.toLowerCase() == 'post' ||
            req.method.toLowerCase() == 'put') {
            xhreq.send(req.data);
        } else {
            xhreq.send();
        }
        return xhreq;
    }

    function init() {
        nlpthreads.search();
    }

    return {
        xhr: xhr,
        init: []
    }
})();

window.onload = function() {
    nlpthreads.init.map(function(initFunc) {initFunc()});
};