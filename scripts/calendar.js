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
        lang: 'pl',
        eventBackgroundColor:(255,0,0),
        aspectRatio:2,
        contentHeight: 650,
        //height: 620,
        eventLimit: true, // for all non-agenda views
        //views: {
        //agenda: {
        eventLimit: 5,// adjust to 6 only for agendaWeek/agendaDay
        //},
        eventLimitText:'events',

        eventRender: function(event, element) {
            $(element).attr('title', event.ownProps.url);
            $(element).on('click',(function () {
                $(".collapse-1", ".collapse-2", ".collapse-3").empty();
                $(".asideBoxSection").fadeIn(1500);
                $("#calendar").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-8");
                $(".collapsed-group-item-1").text(event.ownProps.eventName);
                $('.collapse-1').html
                    ('<h4>' + "Miejsce wydarzenia" + '</h4>' + event.ownProps.position + '<br>' + '<br>'
                    + '<h4>' + "Opis wydarzenia" + '</h4>' + event.ownProps.description + '\n' + '<br>' + '<br>' +
                    '<h4>' + "Witryna internetowa" + '</h4>' + '<a class="linkToWebsite" href="">' + event.ownProps.url + '</a>' + '<br>' + '<br>');
                //$(".linkToWebsite").attr("href", "http://wp.pl");
                $('button').css("display","inline-block");
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
                    $("#calendar").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-8");
                    $(".collapsed-group-item-"+(index+1)).text(event.ownProps.eventName);
                    $('.collapse-'+(index+1)).text(event.ownProps.description);
                    $('button').css("display","inline-block");
                })

        },


        events: function(start, end, timezone, callback) {
            $.ajax({
                url: 'data/events2.json',
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
                                url: event.urls.www,
                                position: event.place.name,
                                images: event.attachments.fileName
                            }
                        });
                    });
                    callback(events);
                    //console.log(arguments);

                }
            });
        }
    });

});

