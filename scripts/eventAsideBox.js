/**
 * Created by klos on 22.01.2016.
 */
$(function() {
    $(".asideButton button").click(function(){
        $(".asideBoxSection").hide();
        $("#calendar").removeClass("col-sm-8");
        $(".asideButton button").css('display','block');
    });
});
