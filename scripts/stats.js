/**
 * Created by michal on 11.02.16.
 */
$('.js-update-stats').on('click', function () {
    var dataOfLocalStorage = JSON.parse(localStorage.getItem('log')) || [{'value':'brak wybranych wydarzeń'}];
    var dataForDisplay = dataOfLocalStorage
        .sort(function (a, b) {
            return a.value > b.value ? 1 : -1;
        })
        .reduce(function (a, b) {
            if (a.length > 0 && a[a.length - 1].eventName === b.value) {
                if (b.type === 'addToFav') {
                    a[a.length - 1].occurrences += 10;
                }
                if (b.type === 'show') {
                    a[a.length - 1].occurrences += 1;
                }
                return a;
            } else {
                return a.concat([{
                    eventName: b.value,
                    occurrences: 1
                }]);
            }
        }, []);
    $('.statsHeading').text('Statystyki dotyczące wydarzeń');
    $('.js-stats').empty();
    dataForDisplay.forEach(function (item) {
        $('.js-stats').append($('<li>').append(item.eventName + ' : ' + item.occurrences));
    });

});