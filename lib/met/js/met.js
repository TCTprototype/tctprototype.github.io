/*! met v0.1.0 2015-09-25 */
var language;

var met;

var deviceReady = false;

var gaPlugin;

var GA_ACCOUNT_ID = "UA-55080840-2";

var APP_ID = "com.hc-sc.mobile";

var APP_NAME = "App Name";

var APP_VERSION = "0.0.0";

var GA_PAGE_ID = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    deviceReady = true;
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(successHandler, errorHandler, GA_ACCOUNT_ID, 10);
    met.GA.trackPage(GA_PAGE_ID);
    initialize();
}

function initialize() {
    var date = new Date(document.lastModified);
    $(".date-modified").text(date.getFullYear() + "-" + ("0" + (parseInt(date.getMonth()) + 1)).slice(-2) + "-" + date.getDate());
    met.setLanguage();
}

function exit() {
    met.GA.exit();
}

function successHandler(s) {}

function errorHandler(e) {
    if (deviceReady) {
        alert(e.toString());
    } else {
        console.log(e.toString());
    }
}

met = {
    setLanguage: function() {
        var lang = $("html").attr("lang");
        if (typeof lang !== "undefined") {
            language = lang;
            met.storage.save("language", language);
        } else {
            if (met.storage.exists("language")) {
                language = met.storage.load("language");
            }
        }
    },
    GA: {
        exit: function() {
            if (deviceReady) {
                gaPlugin.exit(successHandler, errorHandler);
            }
        },
        trackPage: function(pageId) {
            var pageName;
            if (deviceReady) {
                pageName = window.location.pathname;
                if (typeof pageId !== "undefined") {
                    if (pageId !== "") pageName = pageId;
                }
                gaPlugin.trackPage(successHandler, errorHandler, pageName);
            } else {
                errorHandler("Device not ready.");
            }
        },
        trackEvent: function(category, eventAction, eventLabel, eventValue) {
            if (deviceReady) {
                gaPlugin.trackEvent(successHandler, errorHandler, category, eventAction, eventLabel, eventValue);
            } else {
                errorHandler("Device not ready.");
            }
        }
    },
    storage: {
        load: function(key) {
            return localStorage[key];
        },
        exists: function(key) {
            if (typeof localStorage[key] !== "undefined") {
                return true;
            }
            return false;
        },
        clear: function() {
            return localStorage.clear();
        },
        size: function() {
            return localStorage.length;
        },
        save: function(key, value) {
            localStorage[key] = value;
        },
        "delete": function(key) {
            localStorage.removeItem(key);
        }
    },
    session: {
        load: function(key) {
            return sessionStorage[key];
        },
        exists: function(key) {
            if (typeof sessionStorage[key] !== "undefined") {
                return true;
            }
            return false;
        },
        clear: function() {
            return sessionStorage.clear();
        },
        size: function() {
            return sessionStorage.length;
        },
        save: function(key, value) {
            sessionStorage[key] = value;
        },
        "delete": function(key) {
            sessionStorage.removeItem(key);
        }
    }
};

if (navigator.userAgent.search("MSIE") >= 0) {
    alert("You must use a modern browser for this app to work. Internet Explorer 10 or better.");
} else if (window.location.href.indexOf("http") === 0) {
    $(function() {
        initialize();
    });
}