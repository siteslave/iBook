app.controller('LoginController', function ($scope, $window, LoginService, LxNotificationService) {

    $scope.login = function () {
        LoginService.login($scope.username, $scope.password)
            .then(function (rows) {
                if (_.size(rows)) {
                    $window.sessionStorage.setItem('username', $scope.username);
                    $window.sessionStorage.setItem('fullname', rows.fullname);
                    $window.location.href = '../page/Index.html';
                } else {
                    LxNotificationService.error('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
                }

            }, function (err) {
                console.log(err);
            });
    };

});