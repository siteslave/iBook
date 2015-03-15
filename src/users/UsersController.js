app.controller('UsersController', function ($scope, UsersService, LxDialogService, LxNotificationService) {

    $scope.users = [];
    $scope.isUpdate = false;

    $scope.getUsers = function () {

        UsersService.getUsers()
            .then(function (rows) {
                $scope.users = rows;
            }, function (err) {
                console.log(err);
            });

    };

    $scope.getUsers();

    $scope.showModal = function () {
        LxDialogService.open('mdlNew');
    };

    $scope.save = function () {
        if ($scope.id) {
            UsersService.doUpdate($scope.fullname, $scope.isActive, $scope.id)
                .then(function () {
                    var idx = _.findIndex($scope.users, {id: $scope.id});

                    $scope.users[idx].fullname = $scope.fullname;
                    $scope.users[idx].is_active = $scope.isActive ? 'Y' : 'N';

                    LxDialogService.close('mdlNew');
                    //$scope.getUsers();

                }, function (err) {
                    console.log(err);
                });
        } else {
            UsersService.save($scope.username, $scope.fullname, $scope.password, $scope.isActive)
                .then(function (id) {

                    var data = {
                        fullname: $scope.fullname,
                        username: $scope.username,
                        is_active: $scope.isActive ? 'Y' : 'N',
                        id: id
                    };

                    $scope.users.push(data);

                    LxDialogService.close('mdlNew');
                    //$scope.getUsers();

                }, function (err) {
                    console.log(err);
                });
        }


    };

    $scope.closingModal = function () {
        $scope.username = null;
        $scope.password = null;
        $scope.fullname = null;
        $scope.isActive = false;
        $scope.id = null;
        $scope.isUpdate = false;
    };

    $scope.doRemove = function (id) {

        LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบ จริงหรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่'
        }, function (res) {
            if (res) {
                UsersService.doRemove(id)
                    .then(function () {
                        var idx = _.findIndex($scope.users, {id: id});
                        $scope.users.splice(idx, 1);

                    }, function (err) {

                    });
            }
        });

    };

    $scope.showEdit = function (user) {

        $scope.isUpdate = true;
        $scope.username = user.username;
        $scope.fullname = user.fullname;
        $scope.isActive = user.is_active == 'Y';
        //
        $scope.id = user.id;
        //
        LxDialogService.open('mdlNew');
    };


});