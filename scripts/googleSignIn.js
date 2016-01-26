$(document).ready(function() {

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
});

//gapi.load('auth2', function() {
//    auth2 = gapi.auth2.init({
//        client_id: 'CLIENT_ID.apps.googleusercontent.com',
//        fetch_basic_profile: false,
//        scope: 'profile'
//    });
//
//    // Sign the user in, and then retrieve their ID.
//    auth2.signIn().then(function() {
//        console.log(auth2.currentUser.get().getId());
//    });
//});