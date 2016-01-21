/**
 * Created by klos on 19.01.2016.
 */

(function () {

    var $container = $(document).find('.app');
    var $list = $('<ul>');

    $.get('data/events.xml', function (response) {
        $(response).find('entry').map(function (index) {
            var placeName = $(this).find('place name').text();
            var name = $(this).find('entry > name').text();
            var startDate = $(this).find('startDate').text();
            var descLong = $(this).find('descLong').length > 0
                ? $(this).find('descLong').text() : 'brak';
            var startDay = startDate.slice(0,10);
            var startHour = startDate.slice(11,16);
            return $('<li>')
                .append(index + ' ')
                .append('Start imprezy: ' + startDay + ' ' + 'godzina: ' + startHour)
                .append('<p>' + 'Miejsce imprezy: ' + placeName)
                .append('<p>' + 'Nazwa imprezy: '+ name)
                .append('<p>' + 'Opis imprezy: ' + descLong);

        }).each(function () {
            $list.append($(this));
        });

        $container.append($list);
    })
}());