"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnixTimestampFromISO = exports.convertDataToDaily = void 0;
function convertDataToDaily(data) {
    var timeSeries = data["Time Series (Digital Currency Daily)"];
    var dailyDataArray = Object.keys(timeSeries).map(function (dateString) {
        var closingPrice = parseFloat(timeSeries[dateString]["4a. close (USD)"]);
        var date = new Date(dateString);
        return {
            date: date.valueOf(),
            closingPrice: closingPrice,
        };
    });
    return dailyDataArray;
}
exports.convertDataToDaily = convertDataToDaily;
function getUnixTimestampFromISO(dateISO) {
    var year = dateISO.substring(0, 4);
    var month = dateISO.substring(4, 6);
    var day = dateISO.substring(6, 8);
    var hours = dateISO.substring(9, 11);
    var minutes = dateISO.substring(11, 13);
    var seconds = dateISO.substring(13, 15);
    var dateString = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds);
    var date = new Date(dateString);
    return date.valueOf();
}
exports.getUnixTimestampFromISO = getUnixTimestampFromISO;
//# sourceMappingURL=utils.js.map