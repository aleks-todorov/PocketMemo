/// <reference path="require.js" />
/// <reference path="jquery-2.0.3.js" />
/// <reference path="rsvp.min.js" />

var httpRequester = (function () {

    function getJSON(serviceUrl, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                type: "GET",
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function postJSON(serviceUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                dataType: "json",
                type: "POST",
                contentType: "application/json",
                headers: headers,
                data: JSON.stringify(data),
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function putJSON(serviceUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                dataType: "json",
                type: "PUT",
                contentType: "application/json",
                headers: headers,
                data: JSON.stringify(data),
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    return {
        getJSON: getJSON,
        postJSON: postJSON,
        putJSON: putJSON
    }
}());