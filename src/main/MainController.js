// Main controller
app.controller('MainController', function ($scope, MainService, LxProgressService) {

    $scope.getUser = function () {
        LxProgressService.linear.show('#5fa2db', '#progress');
        MainService.getUser()
            .then(function (data) {
                $scope.username = data.username;
                //$scope.img = data.image_urls.bigger;
                $scope.img = data.image_urls.epic;
                LxProgressService.linear.hide();
            }, function (err) {
                console.log(err);
            });
    };
});