var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
            client_id: '72627051191-b1l6mov4fabj10q5eqbv91gu42ilsgqq.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        });
        attachSignin(document.getElementById('customBtn'));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            window.location = "http://test.app.events.jfdd.infoshareaca.nazwa.pl/";
            //document.getElementById('name').innerText = "Signed in: " +
            //    googleUser.getBasicProfile().getName();
        }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}



//function signOut() {
    //    var auth2 = gapi.auth2.getAuthInstance();
    //    auth2.signOut().then(function () {
    //        console.log('User signed out.');
    //    });
    //}


