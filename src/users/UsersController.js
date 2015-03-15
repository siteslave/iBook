app.controller('UsersController', function ($scope, UsersService, LxDialogService) {

    $scope.users = [];

    UsersService.getUsers()
        .then(function (rows) {
            $scope.users = rows;
        }, function (err) {
            console.log(err);
        });

    $scope.showModal = function () {
        LxDialogService.open('mdlNew');
    };

});