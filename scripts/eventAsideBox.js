/**
 * Created by klos/michal on 22.01.2016.
 */
$(function() {
    $("#accordion").accordion();

    $(".asideBoxSection").hide();

    $("button").click(function(){
        $(".asideBoxSection").fadeIn(1000);
        $("#calendar").addClass("col-sm-8");
    });

});
