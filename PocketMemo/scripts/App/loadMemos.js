/// <reference path="../../kendo/js/jquery.min.js" />
/// <reference path="../../kendo/js/kendo.all.min.js" /> 
/// <reference path="dataPersister.js" />

var app = app || {};

(function (a) {

    var baseSelector = "#load-option";
    var mediaContent = null;
    var isPlaying = false;

    var viewModel = kendo.observable({
        options: [],
        textMemosCollection: [],
        locationMemosCollection: [],
        audioMemosCollection: [],
        change: onOptionChanged,
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var options = dataPersister.getLoadOptions();
        var textMemosCollection = dataPersister.getTextMemos();
        var locationMemosCollection = dataPersister.getLocationMemos();
        var audioMemosCollection = dataPersister.getAudiMemos();
        viewModel.set("options", options);
        viewModel.set("textMemosCollection", textMemosCollection);
        viewModel.set("locationMemosCollection", locationMemosCollection);
        viewModel.set("audioMemosCollection", audioMemosCollection);
        viewModel.selectedOption = options[0];
        $(".inner-content > div").hide();
        $(baseSelector + 0).show();
        initLists();
    }

    function initLists() {
        $("#textMemos-listview").kendoMobileListView({
            dataSource: kendo.data.DataSource.create({ data: viewModel.textMemosCollection, group: "Date" }),
            template: $("#customTextMemosListTemplate").html(),
            selectable: true,
            headerTemplate: "<h2>Date: ${value}</h2>"
        })

        $("#locationMemos-listView").kendoMobileListView({
            dataSource: kendo.data.DataSource.create({ data: viewModel.locationMemosCollection, group: "Date" }),
            template: $("#customLocationMemosListTemplate").html(),
            selectable: true,
            headerTemplate: "<h2>Date: ${value}</h2>"
        })

        $(".item-showMapButton").click(function (e) {
            var element = e.currentTarget;
            var longitude = $(element).attr('data-longitude');
            var latitude = $(element).attr('data-latitude');
            navigator.notification.vibrate(3000);
            navigator.notification.alert("Not implemented yet!");
        });
         
        $("#audioMemos-list").kendoMobileListView({
            dataSource: kendo.data.DataSource.create({ data: viewModel.audioMemosCollection, group: "Date" }),
            template: $("#customAudioMemoListTemplate").html(),
            headerTemplate: "<h2>Date: ${value}</h2>"
        })

        $(".item-playMedia").click(function (e) {
            var element = e.currentTarget;
            var path = $(element).attr('data-path');

            mediaContent = new Media(path, function () {
                consol.log("Success playing media");
            }, function () { console.log("Error while playing media") }, null);
        })
    }

    function onOptionChanged(e) {
        var index = e.sender._selectedValue;
        var oldElement = baseSelector + viewModel.selectedOption.Id;
        $(oldElement).toggle();
        viewModel.selectedOption = viewModel.options[index];
        var selector = baseSelector + viewModel.selectedOption.Id;
        $(selector).toggle();
    }

    a.loadMemos = {
        init: init
    };
}(app));
