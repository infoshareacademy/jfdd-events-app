/**
 * Created by klos on 22.01.2016.
 */
var events;
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
                $(".collapse-1", ".collapse-2", ".collapse-3").empty();
                $(".asideBoxSection").fadeIn(1500);
                $("#calendar").addClass("col-sm-8");
                $(".collapsed-group-item-1").text(event.ownProps.eventName);
                $('.collapse-1').text(event.ownProps.description
                    + '\n' + event.ownProps.url);
                $('button').css("display","block");
            }));
        },
        dayClick: function(date, jsEvent, view) {
            $(".collapse-1, .collapse-2, .collapse-3, " +
                ".collapsed-group-item-1, .collapsed-group-item-2, .collapsed-group-item-3").empty();
            var todayEvents = events.filter(function (event) {
               return $.fullCalendar.moment(event.start).format('YYYY-MM-DD') === date.format();
            });
            console.log(todayEvents);

                todayEvents.forEach(function (event, index) {
                    $(".asideBoxSection").fadeIn(1500);
                    $("#calendar").addClass("col-sm-8");
                    $(".collapsed-group-item-"+(index+1)).text(event.ownProps.eventName);
                    $('.collapse-'+(index+1)).text(event.ownProps.description);
                    $('button').css("display","block");
                })

        },
        lang: 'pl',
        height: 650,
        events: function(start, end, timezone, callback) {
            $.ajax({
                url: 'data/events.json',
                dataType: 'json',
                success: function(eventsFeed) {
                    events = [];
                    eventsFeed.forEach(function (event, index) {
                        events.push({
                            title: event.name,
                            start: event.startDate,
                            end: event.endDate,
                            ownProps: {
                                description: event.descLong,
                                eventName: event.name,
                                url: event.urls.www
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

