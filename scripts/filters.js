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
        $(".filter_category.active").removeClass('active');
        $(this).addClass('active')
    })
}


var createFilters = function(filters_list) {
    /* Dynamically creates buttons for filtering */
    var filters_html = ""
    filters_list.forEach(function(elem) {
        filters_html += "<input type='button' class='btn btn-default filter_category' value='" + elem + "'>"
    });
    $("#filters").html(filters_html).find('.btn:first-of-type').addClass('active');
    filterHndl();
};