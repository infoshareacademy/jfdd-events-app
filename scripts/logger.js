/**
 * Created by michal on 09.02.16.
 */
/**
 * Created by michal on 04.02.16.
 */
var logger = (function(){
    var events = [];
    function getStorage() {
        events = events.concat(JSON.parse(localStorage.getItem('logger')));
    }

    function addToLocalStorage(item){
        localStorage.setItem('logger', JSON.stringify(item));
    }

    return {
        log: function (event) {
            getStorage();
            events.push(event);
            addToLocalStorage(events);
        }
    }
})();
