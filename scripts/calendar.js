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
            $(element).attr('title', event.ownProps.url);
            $(element).on('click',(function () {
                $('#collapseOne .panel-body, #collapseTwo .panel-body, #collapseThree .panel-body').empty();
                $(".asideBoxSection").fadeIn(1500);
                $("#calendar").addClass("col-sm-8");
                $(".collapsible-group-item-1").text(event.ownProps.eventName);
                $('#collapseOne .panel-body').text(event.ownProps.description
                    + '\n' + event.ownProps.url);
            }));
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
                            ownProps: {
                                description: event.descLong,
                                eventName: event.name,
                                url: event.urls.www,
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

