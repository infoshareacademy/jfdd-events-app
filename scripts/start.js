/**
 * Created by klos on 26.01.2016.
 */

$('.logInButton, .logInMenu').click(function() {
    $('.popUp').show();
    $('.mainContent').hide();
    $('.backgroundImage').stop().animate(
        {blurRadius: 3},
        {
            duration: 1000,
            easing: 'easeInOutCubic',

            step: function () {
                $('.backgroundImage').css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        }
    );
});



$(".closingCross").click(function() {
    $(".popUp").hide();
    $('.mainContent').show();
    $('.backgroundImage').stop().animate(
        {blurRadius: 0},
        {
            duration: 1000,
            easing: 'easeInOutCubic',

            step: function () {
                $('.backgroundImage').css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        }
    );
});

