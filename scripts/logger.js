/**
 * Created by michal on 04.02.16.
 */
var logger = (function() {
    var key = 'log';
    return {
        log: function (event) {
            var events = JSON.parse(localStorage.getItem(key)) || [];
            events.push(event);
            localStorage.setItem(key, JSON.stringify(events));
        }
    }
})();
