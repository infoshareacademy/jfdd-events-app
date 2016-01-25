/**
 * Created by klos on 22.01.2016.
 */
$(function() {
    $("#accordion").accordion();

$("button").click(function(){
    $(".asideBoxSection").fadeIn(1000);
    $("#calendar").addClass("col-sm-8");
});

});
