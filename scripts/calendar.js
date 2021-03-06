/**
 * Created by klos on 22.01.2016.
 */
var events;

$(document).ready(function() {
    getCategories();

    $('#calendar').fullCalendar({

        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        //defaultView: 'basic',

        lang: 'pl',
        eventBackgroundColor:(255,0,0),
        height: 680,
        eventLimit: 3,
        eventLimitText: " ",
        views: {
            basic: {
                eventLimit: 13
            }
        },

        eventRender: function(event, element) {
            var titleOfValue;
            var end = moment(event.ownProps.end);
            $(element).attr('title', event.ownProps.eventName);
            $(element).on('click',(function () {
                titleOfValue = event.ownProps.eventName;

                $('.placed').off('click').on('click', function () {
                    var dataOfStorage = JSON.parse(localStorage.getItem('log'));
                    if(
                        dataOfStorage.find(function (item) {
                            return item.value === titleOfValue && item.type === 'addToFav';
                        }) === undefined
                    ) {
                        dataOfStorage.push({type: 'addToFav', value: titleOfValue});
                        localStorage.setItem('log', JSON.stringify(dataOfStorage));
                    }
                });
                $(".collapse-1", ".collapse-2", ".collapse-3").empty();
                $(".asideBoxSection").fadeIn(1500);
                $("#calendar").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-8");
                $(".collapsed-group-item-1").text(event.ownProps.eventName);
                $('.collapse-1').html
                    ('<img class="img-responsive" alt=" brak zdjęcia dla tego wydarzenia" src=' + event.ownProps.image + '>'
                    + '<h4>' + "Miejsce wydarzenia" + '</h4>' + event.ownProps.position + '<br>' + '<br>'
                    + '<h4>' + "Początek" + '</h4>' + event.start.format('YYYY-MM-DD') + ', godzina '
                    + event.start.format('HH:mm') + '<br>' + '<br>'
                    + '<h4>' + "Koniec" + '</h4>' + end.format('YYYY-MM-DD') + ', godzina '
                    + end.format('HH:mm') + '<br>' + '<br>'
                    + '<h4>' + "Opis wydarzenia" + '</h4>' + event.ownProps.description + '\n' + '<br>' + '<br>'
                    + (event.ownProps.url ?
                        '<h4>Witryna internetowa</h4><a class="linkToWebsite" href="" target="_blank">' + event.ownProps.url + '</a><br>' : ''))
                    .find('img').on('error', function() {
                        //this.src = 'images/logo.png';
                        $(this).remove();
                    });
                $(".linkToWebsite").attr("href", event.ownProps.url);
                $('.baton').css("display","inline-block");
            }));

            $(element).on('click',function(){
                logger.log( { type: 'show', value: event.title } );
            });
        },

        //dayClick: function(date, jsEvent, view) {
        //    $(".collapse-1, .collapse-2, .collapse-3, " +
        //        ".collapsed-group-item-1, .collapsed-group-item-2, .collapsed-group-item-3").empty();
        //    var todayEvents = events.filter(function (event) {
        //       return $.fullCalendar.moment(event.start).format('YYYY-MM-DD') === date.format();
        //    });
        //    console.log(todayEvents);
        //
        //        todayEvents.forEach(function (event, index) {
        //            $(".asideBoxSection").fadeIn(1500);
        //            $("#calendar").addClass("col-sm-8");
        //            $(".collapsed-group-item-"+(index+1)).text(event.ownProps.eventName);
        //            $('.collapse-'+(index+1)).text(event.ownProps.description);
        //            $('button').css("display","inline-block");
        //        })
        //},


        events: function (start, end, timezone, callback) {

            $.ajax({
                url: 'data/events2.json',
                dataType: 'json',

                success: function(eventsFeed) {
                    events = [];
                    eventsFeed.forEach(function (event, index) {

                        function getAttachment(element) {
                            var arr = element.attachments.map(function (item) {
                                return item.fileName;
                            });
                                return arr[0];
                        }

                        if ($.inArray(event.categoryId, filterCategory) > -1 || filterCategory.length == 0) {
                            /* if event category matches filter or 'no filtering' */

                            events.push({
                                title: event.name,
                                start: event.startDate,
                                //end: event.endDate,
                                ownProps: {
                                    description: event.descLong,
                                    eventName: event.name,
                                    end: event.endDate,
                                    url: event.urls.www,
                                    position: event.place.name,
                                    image: getAttachment(event),
                                    categoryId: event.categoryId
                                }
                            })
                        };
                    });
                    callback(events);
                    //console.log(arguments);

                }

            });
        },
    });

});

