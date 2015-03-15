// Connection setting
//var knex = require('knex')({
//    client: 'mysql',
//    connection: {
//        host: 'localhost',
//        database: 'ibook',
//        user: 'root',
//        password: '789124',
//        port: 3306
//    }
//});

var _ = require('lodash');
var gui = require('nw.gui');
var jf = require('jsonfile');
var fs = require('fs');
var path = require('path');
var win = gui.Window.get();

var Config = {};
Config.appPath = gui.App.dataPath;
Config.configFile = path.join(Config.appPath, 'config.json');

var isReady = fs.existsSync(Config.configFile);

if (!isReady) {
    var defaultConfig = {
        host: 'localhost',
        database: 'ibook',
        user: 'ibook',
        password: 'ibook',
        port: 3306
    };

    jf.writeFileSync(Config.configFile, defaultConfig);
}

var app = angular.module('app', ['lumx', 'ngRoute']);
// routing
app.config(function ($routeProvider) {

    $routeProvider
        .when('/', { // #/
            templateUrl: '../main/Main.html',
            controller: 'MainController'
        })

        .when('/users', { // #/users
            templateUrl: '../users/Users.html',
            controller: 'UsersController'
        })

        .when('/inbox/:id', { // #/inbox
            templateUrl: '../inbox/Inbox.html',
            controller: 'InboxController'
        })

        .when('/reports', { // #/reports
            templateUrl: '../reports/Reports.html',
            controller: 'ReportsController'
        })

        .otherwise({ redirectTo: '/' });

});

app.controller('ToolbarController', function ($scope, $window) {
    $scope.fullname = $window.sessionStorage.getItem('fullname');

    $scope.logout = function () {
        $window.sessionStorage.removeItem('fullname');
        $window.sessionStorage.removeItem('username');

        $window.location.href = '../login/Login.html';
    };
});

win.on('minimize', function () {
    var tray = new gui.Tray({title: 'iBook'});
    var menu = new gui.Menu();
    var that = this;

    menu.append(new gui.MenuItem({
        type: 'normal',
        label: 'เปิดหน้าต่าง',
        click: function () {
            that.show();
            tray.remove();
            tray = null;
        }
    }));

    tray.menu = menu;
    // hide window
    that.hide();

});