/// <reference path="../../kendo/js/jquery.min.js" />
(function (global) {

    app = global.app = global.app || {};
    localStorageApp = global.localStorage;

    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("offline", onOfflineMode, false);
    document.addEventListener("online", onOnlineMode, false);

    function onDeviceReady() {
        app.application = new kendo.mobile.Application(document.body, {
            layout: "main-layout",
            transition: "slide"
        });

        navigator.splashscreen.hide();
        localStorageApp = global.localStorage;
    }

    function onOfflineMode() {

        //Making Geolocation Option Not Visible
        $(".on-internet-content").css("visibility", "hidden"); 
        $(".no-internet-notification").show();
    }

    function onOnlineMode() {

        //Making Geolocation Option Visible 
        $(".no-internet-notification").hide();
        $(".on-internet-content").css("visibility", "visible"); 
    }

})(window)