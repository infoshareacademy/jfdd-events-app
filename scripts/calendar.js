/**
 * Created by klos on 22.01.2016.
 */
$(document).ready(function() {

    $('#calendar').fullCalendar({
        lang: 'pl',
        height: 650,
        dayClick: function() {
            alert('a day has been clicked!');
        },
        events:

            {
                url: 'data/events.json',
                data: {
                    custom_param1: 'something',
                    custom_param2: 'somethingelse'
                },
                error: function() {
                    alert('there was an error while fetching events!');
                },
                color: 'yellow',   // a non-ajax option
                textColor: 'black' // a non-ajax option
            }

    })


});