app.controller('ConfigController', function ($scope, LxNotificationService) {

    $scope.config = jf.readFileSync(Config.configFile);

    $scope.save = function () {
        jf.writeFileSync(Config.configFile, $scope.config);
        LxNotificationService.success('บันทึกเสร็จแล้ว');
    };
});