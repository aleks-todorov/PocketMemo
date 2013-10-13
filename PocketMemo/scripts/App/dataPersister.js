window.dataPersister = (function () {

    var createOptions = [
        { Id: 0, Name: "Create Text Memo" },
        { Id: 1, Name: "Create Voice Memo" },
        { Id: 2, Name: "Create Video Memo" },
        { Id: 3, Name: "Create Location Memo" }];

    var loadOptions = [
        { Id: 0, Name: "Load Text Memo" },
        { Id: 1, Name: "Load Voice Memo" },
        { Id: 2, Name: "Load Video Memo" },
        { Id: 3, Name: "Load Location Memo" }]

    getCreateOptions = function () {
        return createOptions;
    };

    getLoadOptions = function () {
        return loadOptions;
    };

    getTextMemos = function () {
        var textMemosCollection = [];
        if (localStorageApp.getItem("textMemosCollection") != null) {
            textMemosCollection = JSON.parse(localStorageApp.getItem("textMemosCollection"));
        }

        return textMemosCollection;
    }

    saveTextMemoInLocalStorate = function (textMemo) {

        var textMemosCollection = [];
        if (localStorageApp.getItem("textMemosCollection") != null) {
            textMemosCollection = JSON.parse(localStorageApp.getItem("textMemosCollection"));
        }
        textMemosCollection.push(textMemo);
        localStorageApp.setItem("textMemosCollection", JSON.stringify(textMemosCollection));
    }

    saveLocationMemoInLocaStorage = function (locationMemo) {
        var locationMemosCollection = [];
        if (localStorageApp.getItem("locationMemosCollection") != null) {
            locationMemosCollection = JSON.parse(localStorageApp.getItem("locationMemosCollection"));
        }
        locationMemosCollection.push(locationMemo);
        localStorageApp.setItem("locationMemosCollection", JSON.stringify(locationMemosCollection));
    }

    getLocationMemos = function () {
        var locationMemosCollection = [];
        if (localStorageApp.getItem("locationMemosCollection") != null) {
            locationMemosCollection = JSON.parse(localStorageApp.getItem("locationMemosCollection"));
        }
        return locationMemosCollection;
    }

    saveAudioMemoInLocaStorage = function (audioMemo) {
        var audioMemosCollection = [];
        if (localStorageApp.getItem("audioMemosCollection") != null) {
            audioMemosCollection = JSON.parse(localStorageApp.getItem("audioMemosCollection"));
        }
        audioMemosCollection.push(audioMemo);
        localStorageApp.setItem("audioMemosCollection", JSON.stringify(audioMemosCollection));
    }

    getAudiMemos = function () {
        var audioMemosCollection = [];
        if (localStorageApp.getItem("audioMemosCollection") != null) {
            audioMemosCollection = JSON.parse(localStorageApp.getItem("audioMemosCollection"));
        }
        return audioMemosCollection;
    }

    return {
        getCreateOptions: getCreateOptions,
        getLoadOptions: getLoadOptions,
        saveTextMemo: saveTextMemoInLocalStorate,
        getTextMemos: getTextMemos,
        saveLocationMemo: saveLocationMemoInLocaStorage,
        getLocationMemos: getLocationMemos,
        saveAudioMemoInLocaStorage: saveAudioMemoInLocaStorage,
        getAudiMemos: getAudiMemos
    }
}());