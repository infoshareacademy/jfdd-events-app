/**
 * Created by klos on 22.01.2016.
 */

/**
 * Load and process the json feed
 */
(function () {


    var $jsonFetchingStatusContainer = $('#json-fetching-status');

    $jsonFetchingStatusContainer.text('Fetching...');
    $.ajax({
        url: 'data/events.json',
        success: function (response) {
            console.log(response);
            $jsonFetchingStatusContainer.text('Fetched.');
        }
    });
}());