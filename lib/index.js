'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONDerulo = function () {
    function JSONDerulo() {
        _classCallCheck(this, JSONDerulo);
    }

    /**
     *
     *
     * @param jsonFile  - String of filepath for JSON file
     * @param sortField - Field of the JSON key, you want to sort
     * @returns json - A sorted stringifed json object based on what you wanted sorted
     */


    _createClass(JSONDerulo, [{
        key: 'sortJsonFile',
        value: function sortJsonFile(jsonFile, sortField) {
            return _q2.default.promise(function (resolve, reject) {
                _fs2.default.readFile(jsonFile, 'utf-8', function (err, file) {
                    var json = void 0;

                    if (err) {
                        return reject(err);
                    }

                    try {
                        json = JSON.parse(file);
                    } catch (e) {
                        return reject(e);
                    }

                    json.map(function (item) {
                        (0, _assert2.default)(item[sortField] !== undefined, 'Sort value needs to exist for all items');
                        (0, _assert2.default)(typeof item[sortField] === 'string' || _typeof(item[sortField] === 'Number'), 'Sort field must be sortable');
                    });

                    if (typeof json[0][sortField] === "string") {
                        json = json.sort(function (a, b) {
                            return a[sortField].localeCompare(b[sortField]);
                        });
                    } else {
                        json = json.sort(function (a, b) {
                            return a[sortField] - b[sortField];
                        });
                    }

                    json = JSON.stringify(json, null, 2);

                    _fs2.default.writeFile(jsonFile, json, 'utf-8', function (err, file) {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(json);
                    });
                });
            });
        }

        /**
         * Will go through your JSON file and find all duplication based on key is passed in
         *
         * @param jsonFile  - String of filepath for JSON file
         * @param sortField - Field of the JSON key, you want to sort
         * @returns dupedItems - An array containing all the duplicates in your json file
         */

    }, {
        key: 'findAllDupes',
        value: function findAllDupes(jsonFile, dupeField) {
            return new _q2.default.promise(function (resolve, reject) {
                _fs2.default.readFile(jsonFile, 'utf-8', function (err, file) {
                    var json = void 0,
                        dupedItems = [];

                    if (err) {
                        throw err;
                    }

                    json = JSON.parse(file);

                    for (var i = 0; i < json.length; i++) {
                        var itemCount = 0;

                        for (var j = 0; j < json.length; j++) {
                            if (json[j][dupeField] === json[i][dupeField]) {
                                itemCount++;
                            }
                        }

                        if (itemCount > 1 && dupedItems.indexOf(json[i][dupeField]) === -1) {
                            dupedItems.push(json[i][dupeField]);
                        }
                    }

                    resolve(dupedItems);
                });
            });
        }

        /**
         *  Removes a duplicate value from your JSON file based on key and dupe to remove
         *
         * @param jsonFile  - String of filepath for JSON file
         * @param dupeField
         * @param dupeValueToRemove
         * @returns json - A stringifed json object with the dupe removed
         */

    }, {
        key: 'removeDupe',
        value: function removeDupe(jsonFile, dupeField, dupeValueToRemove) {
            return _q2.default.promise(function (resolve, reject) {
                _fs2.default.readFile(jsonFile, 'utf-8', function (err, file) {
                    var json = void 0,
                        dupeItems = [];

                    if (err) {
                        return reject(err);
                    }

                    try {
                        json = JSON.parse(file);
                    } catch (e) {
                        return reject(e);
                    }

                    json.map(function (item) {
                        if (item[dupeField] === dupeValueToRemove) {
                            dupeItems.push(item);
                        }
                    });

                    if (dupeItems.length === 0) {
                        return reject("There are no entries for value " + dupeValueToRemove);
                    } else if (dupeItems.length === 1) {
                        return reject("There are no duplicates for value " + dupeValueToRemove);
                    } else {
                        if (dupeItems.length === 2) {
                            json.splice(json.indexOf(dupeItems[1]), 1);
                        } else {
                            for (var i = 1; i < dupeItems.length; i++) {
                                json.splice(json.indexOf(dupeItems[i]), 1);
                            }
                        }
                    }

                    json = JSON.stringify(json, null, 2);

                    return _fs2.default.writeFile(jsonFile, json, 'utf-8', function (err, file) {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(json);
                    });
                });
            });
        }
    }]);

    return JSONDerulo;
}();

exports.default = new JSONDerulo();