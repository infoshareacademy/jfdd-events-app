/**
 * Created by michal on 11.02.16.
 */
$('.js-update-stats').on('click', function () {
    var dataOfLocalStorage = JSON.parse(localStorage.getItem('log')) || [{'value':'brak wybranych wydarzeń'}];
    var dataForDisplay = dataOfLocalStorage
        .reduce(function (a, b) {
            if (a.length > 0 && a[a.length - 1].eventName === b.value) {
                if (b.type === 'addToFav') {
                    a[a.length - 1].occurrences += 10;
                    a[a.length - 1].kind = 'addToFav';
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
        }, [])
        .sort(function (a, b) {
            return a.occurrences < b.occurrences ? 1 : -1;
        });
    $('.statsHeading').text('Statystyki dotyczące wydarzeń');
    $('.js-stats').empty();
    dataForDisplay.forEach(function (item) {
        $('.js-stats').append(((item.kind === 'addToFav') ?  $('<li class="list-group-item" style="color: red">') :
            $('<li class="list-group-item">')).append($('<span class="badge">')
            .append(item.occurrences)).append(item.eventName));
        console.log(item.kind);
    });
});