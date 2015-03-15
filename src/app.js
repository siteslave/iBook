// Connection setting
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'ibook',
        user: 'root',
        password: '789124',
        port: 3306
    }
});

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