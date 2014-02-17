/*jslint node: true, nomen: true, devel : true, unparam : true, bitwise: true */

var STORAGE_ID = 'log-ex',
    localStorage = global.localStorage,
    _ = global._;
if (typeof localStorage !== "object" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./store');

    // clear storage
    //localStorage.clear();
}

if (typeof _ !== "object" || _ === null) {
    _ = require('lodash');
}

function uuid() {
    "use strict";
    var mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return (function (mask) {
        return mask.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }(mask));
}

function getData() {
    "use strict";
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

function saveData(todos) {
    "use strict";
    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
}

function saveRecord(record) {
    "use strict";
    var store = getData(),
        time,
        uid;
    time = Date.now();
    uid = uuid();
    _.extend(record, { id: uid, updated_at: time, created_at: time });
    store.push(record);
    saveData(store);
}


// exports
exports.list = function (req, res) {
    "use strict";
    res.json(getData());
};

exports.create = function (req, res) {
    "use strict";
    _.forEach(req.body, function (record) {
        saveRecord(record);
    });
    res.json(req.body);
};