/**
 * Created by klos on 22.01.2016.
 */
var events;
var filterCategory=[];      // only evenst with hese category ids will be shown; empty list = no filtering (all visible)
var categoryMap = {};      // {root_category_name: [list_of_category_ids having a certain root_category_name}
var nonSelectableCategories = ["Zakupy i wymiana", "Inne"];     // a list of categories for which fitlters are not to be created
var noFilter = "Wszystkie wydarzenia";

// Parses categories data from json, create a dictionary with root category as keys and corresponding list of category ids as values.
var getCategories = function() {
    $.getJSON("data/categories.json", function(data) {
        var rootCategory;
        var filterList = [noFilter];   // list of filters / buttons
        for (i=0; i < data.length; i++) {
            elem = data[i]
            if (!elem.hasOwnProperty("root_category"))
                rootCategory = elem.name
            else
                rootCategory = elem.root_category.name;
            rootCategory = rootCategory.charAt(0).toUpperCase() + rootCategory.slice(1);
            if (categoryMap.hasOwnProperty(rootCategory))
                categoryMap[rootCategory].push(elem.id)
            else
                categoryMap[rootCategory] = [elem.id];
        };

        var categoryName;
        for (i=0; i < Object.keys(categoryMap).length; i++) {
            categoryName = Object.keys(categoryMap)[i];
            if (($.inArray(categoryName, nonSelectableCategories) == -1)) {
                filterList.push(categoryName);
            };
        };

        createFilters(filterList);      // create filter buttons

    })
}

var filterHndl = function() {
    $(".filter_category").click(function() {
        var filterName = ($(this).attr("value"));
        if (filterName == noFilter)
            filterCategory = [];
        else {
            filterCategory = categoryMap[filterName]
        };

        $('#calendar').fullCalendar( 'refetchEvents' );     // refecth events with filter applied
    })
}


var createFilters = function(filters_list) {
    /* Dynamically creates buttons for filtering */
    var filters_html = ""
    filters_list.forEach(function(elem) {
        filters_html += "<input type='button' class='filter_category' value='" + elem + "'>"
    });
    $("#filters").html(filters_html);
    filterHndl();
};

localStorage.setItem('title', []);

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
            var end = moment(event.ownProps.end);
            $(element).attr('title', event.ownProps.eventName);
            $(element).on('click',(function () {
                $(".collapse-1", ".collapse-2", ".collapse-3").empty();
                $(".asideBoxSection").fadeIn(1500);
                $("#calendar").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-8");
                $(".collapsed-group-item-1").text(event.ownProps.eventName);
                $('.collapse-1').html
                    ('<img class="img-responsive" alt=" brak zdjęcia dla tego wydarzenia" src=' + event.ownProps.images + '>'
                    + '<h4>' + "Miejsce wydarzenia" + '</h4>' + event.ownProps.position + '<br>' + '<br>'
                    + '<h4>' + "Początek" + '</h4>' + event.start.format('YYYY-MM-DD') + ', godzina '
                    + event.start.format('HH:mm') + '<br>' + '<br>'
                    + '<h4>' + "Koniec" + '</h4>' + end.format('YYYY-MM-DD') + ', godzina '
                    + end.format('HH:mm') + '<br>' + '<br>'
                    + '<h4>' + "Opis wydarzenia" + '</h4>' + event.ownProps.description + '\n' + '<br>' + '<br>' +
                    '<h4>' + "Witryna internetowa" + '</h4>' + '<a class="linkToWebsite" href="" target="_blank">'
                    + event.ownProps.url + '</a>' + '<br>' + '<br>');
                $(".linkToWebsite").attr("href", event.ownProps.url);
                $('.baton').css("display","inline-block");
            }));
            $(element).on('click',function(){

                Storage.prototype.setObj = function(key, obj) {
                    return this.setItem(key, JSON.stringify(obj))
                };
                Storage.prototype.getObj = function(key) {
                    return JSON.parse(this.getItem(key));
                };
                localStorage.setObj('title', event.title);
                localStorage.getObj('title');
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
        //
        //},


        events: function (start, end, timezone, callback) {

            $.ajax({
                url: 'data/events2.json',
                dataType: 'json',

                success: function(eventsFeed) {
                    events = [];
                    eventsFeed.forEach(function (event, index) {

                        function getAttachments(element) {
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
                                    images: getAttachments(event),
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

