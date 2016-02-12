/**
 * Created by klos on 22.01.2016.
 */
$(function() {
    $(".asideButton button").click(function(){
        $(".asideBoxSection").hide();
        $("#calendar").removeClass("col-sm-12 col-md-12 col-lg-8");
        $(".asideButton button").css('display','block');
    });
});
