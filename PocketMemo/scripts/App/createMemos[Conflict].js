/// <reference path="../../kendo/js/jquery.min.js" />
/// <reference path="dataPersister.js" />

var app = app || {};

(function (a) {

    var baseSelector = "#create-option";

    var viewModel = kendo.observable({
        options: [],
        selectedOption: null,
        change: onOptionChanged,
        clearText: onClearTextClicked,
        saveTextMemo: saveTextMemo,
        Latitude: "",
        Longitude: "",
        saveLocation: onSaveLocationButtonClicked,
        getLocation: onGetLocationButtonClicked,
    });

    function onSaveLocationButtonClicked() {
        alert("Not implemented yet!")
    }

    function onGetLocationButtonClicked() {
        var options = {
            enableHighAccuracy: true
        },
		that = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            viewModel.set("Latitude",position.coords.latitude);
            viewModel.set("Longitude", position.coords.longitude);
        }, function () {
            alert("There was an error while obtaining your possition. Please check your internet connection and try again!");
        }, options);
    }

    function saveTextMemo() {
        var title = $("#text-memo-title").val();
        var content = $("#text-memo-content").val();
        var myDate = new Date();
        var date = myDate.toDateString();
        var textMemo = { Title: title, Content: content, Date: date };
        dataPersister.saveTextMemo(textMemo);
        onClearTextClicked();
    }

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var options = dataPersister.getCreateOptions();
        viewModel.set("options", options);
        viewModel.selectedOption = options[0];
        $(baseSelector + 0).toggle();
    }

    function onOptionChanged(e) {
        var index = e.sender._selectedValue;
        var oldElement = baseSelector + viewModel.selectedOption.Id;
        $(oldElement).toggle();
        viewModel.selectedOption = viewModel.options[index];
        var selector = baseSelector + viewModel.selectedOption.Id;
        $(selector).toggle();
    }

    function onClearTextClicked() {
        $("#text-memo-title").val("");
        $("#text-memo-content").val("");
    }

    a.createMemos = {
        init: init
    };
}(app));
