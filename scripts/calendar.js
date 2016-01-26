/**
 * Created by klos on 22.01.2016.
 */
$(document).ready(function() {

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventRender: function(event, element) {
            $(element).attr('title', event.ownProps.description);
            $(element).mouseenter(function () {
                $('#collapseOne .panel-body').text(event.ownProps.description);
            });
        },
        lang: 'pl',
        height: 650,
        events: function(start, end, timezone, callback) {
            $.ajax({
                url: 'data/events.json',
                dataType: 'json',
                success: function(eventsFeed) {
                    var events = [];
                    eventsFeed.forEach(function (event, index) {
                        events.push({
                            title: event.name,
                            start: event.startDate,
                            end: event.endDate,
                            url: event.urls.www,
                            ownProps: {
                                description: event.descLong
                            }

                        });
                    });
                    callback(events);
                    console.log(arguments);
                }
            });
        }
    });

});

