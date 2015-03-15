app.factory('MainService', function ($q, $http) {

    return {
        getUser: function () {
            var q = $q.defer();

            var options = {
                url: 'http://uifaces.com/api/v1/random',
                method: 'GET'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });


            return q.promise;
        }
    };

});