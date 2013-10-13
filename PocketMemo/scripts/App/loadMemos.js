/// <reference path="../../kendo/js/jquery.min.js" />
/// <reference path="../../kendo/js/kendo.all.min.js" /> 
/// <reference path="dataPersister.js" />

var app = app || {};

(function (a) {

    var baseSelector = "#load-option";

    var viewModel = kendo.observable({
        options: [],
        textMemosCollection: [],
        locationMemosCollection: [],
        selectedOption: null,
        change: onOptionChanged,
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var options = dataPersister.getLoadOptions();
        var textMemosCollection = dataPersister.getTextMemos();
        var locationMemosCollection = dataPersister.getLocationMemos();
        viewModel.set("options", options);
        viewModel.set("textMemosCollection", textMemosCollection);
        viewModel.set("locationMemosCollection", locationMemosCollection);
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
