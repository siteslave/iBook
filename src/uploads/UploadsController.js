// Reports controller
app.controller('UploadsController', function ($scope, UploadsService) {

    $scope.setFile = function (elm) {
        $scope.fileType = elm.files[0].type;
        $scope.fileName = elm.files[0].name;
        $scope.fileSize = elm.files[0].size;
    };

    $scope.saveFile = function () {

        var fileData = {};

        var file = angular.element(document.querySelector('#fileName'));
        var filePath = file[0].value;

        UploadsService.encodeFile(filePath)
            .then(function (data) {
                fileData.fileType = $scope.fileType;
                fileData.fileName = $scope.fileName;
                fileData.fileSize = $scope.fileSize;
                fileData.fileData = data;

                UploadsService.saveFile(fileData)
                    .then(function () {
                        console.log('Save file success');
                    }, function (err) {
                        console.error(err);
                    });

            }, function (err) {
                console.log(err);
            });

    };

    $scope.createFile = function () {

        UploadsService.getFile()
            .then(function (file) {
                UploadsService.createFile(file.file_name, file.file_data)
                    .then(function () {
                        console.log('Create success');
                    }, function (err) {
                        console.error(err);
                    });
            }, function (err) {
                console.error(err);
            });

    };

});