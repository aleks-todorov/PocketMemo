/// <reference path="../../kendo/js/jquery.min.js" />
/// <reference path="dataPersister.js" />

var app = app || {};

(function (a) {

    //Constants
    var baseSelector = "#create-option";

    var viewModel = kendo.observable({
        options: [],
        selectedOption: null,
        change: onOptionChanged,
        clearText: clearContent,
        saveTextMemo: saveTextMemo,
        Latitude: null,
        Longitude: null,
        PictureUrl: null,
        saveLocation: onSaveLocationButtonClicked,
        getLocation: onGetLocationButtonClicked,
        addPicture: onAddPictureButtonClicked,
        audioRec: onAudioButtonClicked,
    });

    function onAudioButtonClicked() {

        navigator.device.capture.captureAudio(function (capturedFiles) {
            var i,
            media = document.getElementById("media");
            media.innerHTML = "";
            var path = "";
            var myDate = new Date();
            var date = myDate.toDateString();
            for (i = 0; i < capturedFiles.length; i += 1) {
                var path = capturedFiles[i].fullPath;
                media.innerHTML += '<p>Capture taken! Its path is: ' + path + '</p>';

                var audioMemo = {
                    Path: path,
                    Date: date,
                };

                dataPersister.saveAudioMemoInLocaStorage(audioMemo);
            }

        }, function () {
            if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
                alert(error);
            }
            else {
                var media = document.getElementById("media");
                media.innerHTML = "An error occured! Code:" + error.code;
            }
        }, { limit: 1 });

    }

    function onAddPictureButtonClicked() {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;

        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI
        };

        navigator.camera.getPicture(function (imageData) {

            var picture = document.getElementById('picture-container');
            picture.style.display = 'block';

            var url = imageData;
            debugger;
            picture.src = url;
            viewModel.set("PictureUrl", url);

        }, function () {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Picture could not be taken!");
        }, options);
    }

    function onSaveLocationButtonClicked() {
        var description = $("#location-memo-description").val();
        var escapedDescription = $('<div/>').text(description).html();
        var myDate = new Date();
        var date = myDate.toDateString();
        if (viewModel.Longitude == null && viewModel.Latitude == null) {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Please get location first!");
        }
        else if (escapedDescription == null || escapedDescription == "") {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Description cannot be empty!");
        }

        else {
            var locationMemo = {
                Latitude: viewModel.Latitude,
                Longitude: viewModel.Longitude,
                Position: new google.maps.LatLng(viewModel.Latitude, viewModel.Longitude),
                Description: escapedDescription,
                Date: date,
                PictureUrl: viewModel.PictureUrl
            }

            dataPersister.saveLocationMemo(locationMemo);
            clearContent();
        }
    }

    function onGetLocationButtonClicked() {
        var options = {
            enableHighAccuracy: true
        },
        that = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            viewModel.set("Latitude", position.coords.latitude);
            viewModel.set("Longitude", position.coords.longitude);
        }, function () {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("There was an error while obtaining your possition. Please check your internet connection and try again!");

        }, options);
    }

    function saveTextMemo() {
        var title = $("#text-memo-title").val();
        var escapedTitle = $('<div/>').text(title).html();
        var content = $("#text-memo-content").val();
        var escapedContent = $('<div/>').text(content).html();
        if (escapedTitle == "" || escapedTitle == null) {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Title cannot be empty!");

        }
        else if (escapedTitle.length > 30 || escapedTitle.length < 3) {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Title must be between 3 and 30 symbols!");
        }
        else if (escapedContent == "" || escapedContent == null) {
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Content cannot be empty!");

        }
        else {
            var myDate = new Date();
            var date = myDate.toDateString();
            var textMemo = {
                Title: escapedTitle,
                Content: escapedContent,
                Date: date
            };

            dataPersister.saveTextMemo(textMemo);
            clearContent();
        }
    }

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var options = dataPersister.getCreateOptions();
        viewModel.set("options", options);
        viewModel.selectedOption = options[0];
        $(".inner-content > div").hide();
        $(baseSelector + 0).show();
    }

    function onOptionChanged(e) {
        var index = e.sender._selectedValue;
        var oldElement = baseSelector + viewModel.selectedOption.Id;
        $(oldElement).toggle();
        viewModel.selectedOption = viewModel.options[index];
        var selector = baseSelector + viewModel.selectedOption.Id;
        $(selector).toggle();
    }

    function clearContent() {
        $("#text-memo-title").val("");
        $("#text-memo-content").val("");
        $("#location-memo-description").val("");
        viewModel.set("Latitude", null);
        viewModel.set("Longitude", null);
        var picture = document.getElementById('picture-container');
        picture.style.display = 'none';
        picture.src = "";
    }

    a.createMemos = {
        init: init
    };
}(app));
