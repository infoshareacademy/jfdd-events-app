/**
 * Created by klos on 19.01.2016.
 */

(function () {


    var process = function (response) {
        var items = [];

        $(response).find('item').each(function () {
            //var $element = $(this);
            var title = $(this).find('title').text();
            var pubDate = $(this).find('pubDate').text();
            var link = $(this).find('link').text();
            var linkGuid = $(this).find('guid').text();

            items.push({
                title: title,
                pubDate: pubDate,
                link: link,
                guid: linkGuid,

                // date for quicker sorting
                date: Date.parse(pubDate)
            });
        });

        return items;
    };

    var $rssFetchingStatusContainer = $('#rss-fetching-status');
    $rssFetchingStatusContainer.text('Fetching...');

    $.get('data/events.xml', function (response) {
        var items = process(response);

        /**
         * Append items to the DOM
         */

        $('#rss-feed').append(items.sort(function (a, b) {
            var c = b.title > a.title ? -1 : (b.title == a.title ? 0 : 1);
            //var c = b.date > a.date ? -1 : (b.date == a.date ? 0 : 1);

            // Equivalent of the code above
            //if (b.title > a.title) {
            //  c = -1;
            //} else {
            //  if (b.title == a.title) {
            //    c = 0;
            //  } else {
            //    c = 1;
            //  }
            //}

            return c;
        }).map(function (item) {
            var liNode = $('<li>');
            var linkNode = $('<a>');
            var smallNode = $('<small>').css({display: 'block', fontStyle: 'italic'});
            var liGuid = $('<a>').css('display', 'block');

            // <small> tag creation
            smallNode.text(item.pubDate);

            // <li> tag creation
            linkNode.attr('href', item.link);
            linkNode.text(item.title);
            liGuid.attr('href', item.guid);
            liGuid.text(item.guid);

            liNode
                .append(smallNode)
                .append(linkNode)
                .append(liGuid);

            return liNode;
        }));

        $rssFetchingStatusContainer.text('Fetched.');
    }).fail(function (response) {
        $rssFetchingStatusContainer.text('Fetching FAILED.');
    });
}());