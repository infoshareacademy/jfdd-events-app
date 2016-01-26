/**
 * Created by klos on 26.01.2016.
 */
$(document).ready(function () {

    var blurEffect = function () {
        $('.logInButton').mouseenter(function() {
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
    };
    blurEffect();


    var blurClose = function () {
        $('.logInButton').mouseleave(function() {
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
    };
    blurClose();

});